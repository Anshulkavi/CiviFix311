from io import BytesIO
from datetime import timedelta

from PIL import Image
from django.test import override_settings
from django.utils import timezone
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APITestCase, APIClient

from complaints.models import Department, Category, Complaint, Upvote, StatusHistory
from users.models import User
from notifications.models import Notification


def make_test_image_bytes(color=(255, 0, 0), size=(20, 20), fmt="JPEG"):
    img = Image.new("RGB", size, color)
    bio = BytesIO()
    img.save(bio, fmt)
    bio.seek(0)
    return bio.read()


def make_test_image_file(name="test.jpg"):
    return SimpleUploadedFile(
        name,
        make_test_image_bytes(),
        content_type="image/jpeg",
    )


def make_invalid_image_file(name="not-image.jpg"):
    # DRF's ImageField validation uses Pillow to parse content.
    return SimpleUploadedFile(
        name,
        b"this is not a valid image payload",
        content_type="image/jpeg",
    )


class CivicFixAPITestBase(APITestCase):
    """
    Shared helpers for API validation tests.

    Note: we authenticate using /api/auth/login/ so tests exercise the real JWT flow.
    """

    def setUp(self):
        self.client = APIClient()

        # Departments and categories needed for complaint creation.
        self.dept = Department.objects.create(
            name="Public Works",
            description="Handles roads",
            email="pwd@indore.gov.in",
            phone="0731-2501234",
        )
        self.active_category = Category.objects.create(
            name="Roads & Potholes",
            department=self.dept,
            icon="road",
            description="Test category",
            is_active=True,
        )
        self.inactive_category = Category.objects.create(
            name="Inactive Cat",
            department=self.dept,
            icon="tag",
            description="Should be rejected",
            is_active=False,
        )

        # Roles
        self.citizen1 = self._create_user(
            username="citizen1",
            password="CivicFix311!A9s",
            role=User.Role.CITIZEN,
            ward="Ward A",
        )
        self.citizen2 = self._create_user(
            username="citizen2",
            password="CivicFix311!B9s",
            role=User.Role.CITIZEN,
            ward="Ward B",
        )
        self.field_officer = self._create_user(
            username="officer1",
            password="CivicFix311!C9s",
            role=User.Role.FIELD_OFFICER,
            department=self.dept,
            ward="Ward A",
        )
        self.dept_head = self._create_user(
            username="depthead1",
            password="CivicFix311!D9s",
            role=User.Role.DEPT_HEAD,
            department=self.dept,
            ward="Ward A",
        )
        self.admin = self._create_user(
            username="admin1",
            password="CivicFix311!E9s",
            role=User.Role.ADMIN,
            department=self.dept,
            ward="Ward A",
        )

        # Some complaints for list/detail/status/upvote/confirm tests.
        # Create with explicit sla_deadline to avoid depending on model SLA timing in setup.
        self.complaint1 = Complaint.objects.create(
            title="Complaint 1",
            description="Desc 1",
            category=self.active_category,
            department=self.dept,
            citizen=self.citizen1,
            assigned_to=self.field_officer,
            status=Complaint.Status.PENDING,
            priority=Complaint.Priority.LOW,
            address="Address 1",
            ward="Ward A",
            latitude=22.719600,
            longitude=75.857700,
            sla_deadline=timezone.now() + timedelta(hours=23),
        )
        self.complaint2 = Complaint.objects.create(
            title="Complaint 2",
            description="Desc 2",
            category=self.active_category,
            department=self.dept,
            citizen=self.citizen2,
            assigned_to=None,
            status=Complaint.Status.RESOLVED,
            priority=Complaint.Priority.MEDIUM,
            address="Address 2",
            ward="",
            latitude=22.719600,
            longitude=75.857700,
            sla_deadline=timezone.now() + timedelta(hours=23),
        )
        self.closed_complaint = Complaint.objects.create(
            title="Closed complaint",
            description="Closed Desc",
            category=self.active_category,
            department=self.dept,
            citizen=self.citizen1,
            assigned_to=None,
            status=Complaint.Status.CLOSED,
            priority=Complaint.Priority.MEDIUM,
            address="Address 3",
            ward="Ward A",
            latitude=22.719600,
            longitude=75.857700,
            sla_deadline=timezone.now() + timedelta(hours=23),
        )

        # Notifications for tests.
        Notification.objects.create(
            recipient=self.citizen1,
            complaint_id=self.complaint1.id,
            type="submitted",
            title="t1",
            message="m1",
            is_read=False,
        )
        Notification.objects.create(
            recipient=self.citizen1,
            complaint_id=self.complaint2.id,
            type="status",
            title="t2",
            message="m2",
            is_read=True,
        )
        Notification.objects.create(
            recipient=self.citizen2,
            complaint_id=self.complaint1.id,
            type="submitted",
            title="t3",
            message="m3",
            is_read=False,
        )

    def _create_user(self, username, password, role, department=None, ward=""):
        user = User(
            username=username,
            email=f"{username}@example.com",
            first_name=username.title(),
            last_name="User",
            role=role,
            phone="1234567890",
            department=department,
            ward=ward,
        )
        user.set_password(password)
        user.save()
        return user

    def _auth(self, username, password):
        res = self.client.post(
            "/api/auth/login/",
            {"username": username, "password": password},
            format="json",
        )
        assert res.status_code in (200, 201), res.content
        data = res.json()
        self.client.credentials(HTTP_AUTHORIZATION=f"Bearer {data['access']}")
        return data

    def _auth_as_citizen1(self):
        return self._auth(self.citizen1.username, "CivicFix311!A9s")

    def _auth_as_citizen2(self):
        return self._auth(self.citizen2.username, "CivicFix311!B9s")

    def _auth_as_field_officer(self):
        return self._auth(self.field_officer.username, "CivicFix311!C9s")

    def _auth_as_dept_head(self):
        return self._auth(self.dept_head.username, "CivicFix311!D9s")

    def _auth_as_admin(self):
        return self._auth(self.admin.username, "CivicFix311!E9s")

    def _create_complaint_via_api(self, *, user="citizen1", category_id=None, payload_overrides=None, image=None):
        payload_overrides = payload_overrides or {}
        category_id = category_id if category_id is not None else self.active_category.id

        if user == "citizen1":
            self._auth_as_citizen1()
        elif user == "citizen2":
            res = self._auth(self.citizen2.username, "CivicFix311!B9s")
        else:
            raise ValueError("Unknown user for helper")

        data = {
            "title": "API Complaint Title",
            "description": "API Complaint Description",
            "category_id": category_id,
            "address": "Some Address",
            "ward": "Ward A",
            "latitude": "22.719600",
            "longitude": "75.857700",
            **payload_overrides,
        }

        if image is not None:
            # ComplaintDetailSerializer supports before_photo/after_photo.
            data["before_photo"] = image
            return self.client.post(
                "/api/complaints/",
                data,
                format="multipart",
            )
        return self.client.post(
            "/api/complaints/",
            data,
            format="json",
        )


class AuthAndRegistrationValidationTests(CivicFixAPITestBase):
    def test_register_role_forced_to_citizen(self):
        res = self.client.post(
            "/api/auth/register/",
            {
                "username": "newuser",
                "email": "newuser@example.com",
                "password": "CivicFix311!Z9s",
                "password2": "CivicFix311!Z9s",
                "first_name": "New",
                "last_name": "User",
                "phone": "123",
                # Client-supplied role should be ignored (serializer sets it).
                "role": User.Role.ADMIN,
            },
            format="json",
        )
        self.assertEqual(res.status_code, 201 if res.status_code == 201 else 200)
        user = User.objects.get(username="newuser")
        self.assertEqual(user.role, User.Role.CITIZEN)

    def test_register_password_mismatch(self):
        res = self.client.post(
            "/api/auth/register/",
            {
                "username": "mismatchuser",
                "email": "mismatchuser@example.com",
                "password": "CivicFix311!Z9s",
                "password2": "DifferentPassword!1",
                "first_name": "M",
                "last_name": "U",
                "phone": "123",
            },
            format="json",
        )
        self.assertEqual(res.status_code, 400)
        self.assertIn("password", res.json())

    def test_register_invalid_password(self):
        res = self.client.post(
            "/api/auth/register/",
            {
                "username": "weakpassuser",
                "email": "weakpassuser@example.com",
                "password": "short",
                "password2": "short",
                "first_name": "W",
                "last_name": "P",
                "phone": "123",
            },
            format="json",
        )
        self.assertEqual(res.status_code, 400)
        body = res.json()
        self.assertIn("password", body)

    def test_login_wrong_password(self):
        res = self.client.post(
            "/api/auth/login/",
            {"username": self.citizen1.username, "password": "wrong-password"},
            format="json",
        )
        self.assertEqual(res.status_code, 401)


class ComplaintCreateValidationTests(CivicFixAPITestBase):
    def test_create_complaint_missing_category_id(self):
        self._auth_as_citizen1()
        res = self.client.post(
            "/api/complaints/",
            {
                "title": "T",
                "description": "D",
                "address": "A",
                "ward": "Ward A",
                "latitude": "22.719600",
                "longitude": "75.857700",
            },
            format="json",
        )
        self.assertEqual(res.status_code, 400)
        self.assertIn("category_id", res.json())

    def test_create_complaint_inactive_category_rejected(self):
        res = self._create_complaint_via_api(category_id=self.inactive_category.id)
        self.assertEqual(res.status_code, 400)
        body = res.json()
        # PrimaryKeyRelatedField error usually lands under category_id.
        self.assertIn("category_id", body)

    def test_create_complaint_invalid_latitude(self):
        res = self._create_complaint_via_api(payload_overrides={"latitude": "not-a-number"})
        self.assertEqual(res.status_code, 400)
        body = res.json()
        self.assertIn("latitude", body)

    def test_create_complaint_invalid_image_rejected(self):
        res = self._create_complaint_via_api(image=make_invalid_image_file())
        self.assertEqual(res.status_code, 400)
        body = res.json()
        # DRF will report validation under before_photo.
        self.assertIn("before_photo", body)

    def test_create_complaint_success_sets_citizen_and_department(self):
        res = self._create_complaint_via_api()
        self.assertIn(res.status_code, (200, 201))
        complaint = Complaint.objects.latest("id")
        self.assertEqual(complaint.citizen_id, self.citizen1.id)
        self.assertEqual(complaint.department_id, self.active_category.department_id)
        self.assertIsNotNone(complaint.sla_deadline)

    def test_create_complaint_ignores_readonly_fields(self):
        self._auth_as_citizen1()
        res = self.client.post(
            "/api/complaints/",
            {
                "title": "T",
                "description": "D",
                "category_id": self.active_category.id,
                "address": "A",
                "ward": "Ward A",
                "latitude": "22.719600",
                "longitude": "75.857700",
                # These should be read-only and ignored by serializer.
                "assigned_to": self.field_officer.id,
                "department": self.dept.id,
                "citizen": self.citizen2.id,
            },
            format="json",
        )
        self.assertIn(res.status_code, (200, 201))
        complaint = Complaint.objects.latest("id")
        self.assertIsNone(complaint.assigned_to_id)
        self.assertEqual(complaint.citizen_id, self.citizen1.id)


class ComplaintDetailAndStatusValidationTests(CivicFixAPITestBase):
    def test_citizen_can_edit_only_own_complaint(self):
        self._auth_as_citizen1()
        res = self.client.patch(
            f"/api/complaints/{self.complaint2.id}/",
            {"title": "New title"},
            format="json",
        )
        self.assertEqual(res.status_code, 403)

    def test_status_update_invalid_choice(self):
        self._auth_as_field_officer()
        res = self.client.patch(
            f"/api/complaints/{self.complaint1.id}/status/",
            {"status": "not-a-real-status", "note": "n"},
            format="json",
        )
        self.assertEqual(res.status_code, 400)
        self.assertIn("status", res.json())

    def test_status_update_sets_resolved_at_when_resolved(self):
        self._auth_as_field_officer()
        res = self.client.patch(
            f"/api/complaints/{self.complaint1.id}/status/",
            {"status": Complaint.Status.RESOLVED, "note": "resolved"},
            format="json",
        )
        self.assertEqual(res.status_code, 200)
        self.complaint1.refresh_from_db()
        self.assertEqual(self.complaint1.status, Complaint.Status.RESOLVED)
        self.assertIsNotNone(self.complaint1.resolved_at)

    def test_status_update_after_photo_validation(self):
        self._auth_as_field_officer()
        res = self.client.patch(
            f"/api/complaints/{self.complaint1.id}/status/",
            {"status": Complaint.Status.IN_PROGRESS, "note": "note", "after_photo": make_invalid_image_file()},
            format="multipart",
        )
        self.assertEqual(res.status_code, 400)
        body = res.json()
        self.assertIn("after_photo", body)

    def test_status_update_after_photo_success(self):
        self._auth_as_field_officer()
        res = self.client.patch(
            f"/api/complaints/{self.complaint1.id}/status/",
            {"status": Complaint.Status.IN_PROGRESS, "note": "note", "after_photo": make_test_image_file()},
            format="multipart",
        )
        self.assertEqual(res.status_code, 200)
        self.complaint1.refresh_from_db()
        # If the file was saved successfully, after_photo field should be non-empty.
        self.assertTrue(bool(self.complaint1.after_photo))
        self.assertTrue(StatusHistory.objects.filter(complaint=self.complaint1, new_status=Complaint.Status.IN_PROGRESS).exists())


class UpvoteAndConfirmationValidationTests(CivicFixAPITestBase):
    def test_upvote_toggle_increments_and_decrements(self):
        self._auth_as_citizen1()
        # Start from a known count.
        self.complaint1.upvote_count = 0
        self.complaint1.save(update_fields=["upvote_count"])

        r1 = self.client.post(f"/api/complaints/{self.complaint1.id}/upvote/")
        self.assertEqual(r1.status_code, 200)
        self.complaint1.refresh_from_db()
        self.assertEqual(self.complaint1.upvote_count, 1)
        self.assertTrue(Upvote.objects.filter(complaint=self.complaint1, citizen=self.citizen1).exists())

        r2 = self.client.post(f"/api/complaints/{self.complaint1.id}/upvote/")
        self.assertEqual(r2.status_code, 200)
        self.complaint1.refresh_from_db()
        self.assertEqual(self.complaint1.upvote_count, 0)
        self.assertFalse(Upvote.objects.filter(complaint=self.complaint1, citizen=self.citizen1).exists())

    def test_upvote_escalates_priority_low_to_medium_at_50(self):
        self._auth_as_citizen1()
        self.complaint1.upvote_count = 49
        self.complaint1.priority = Complaint.Priority.LOW
        self.complaint1.save(update_fields=["upvote_count", "priority"])

        r = self.client.post(f"/api/complaints/{self.complaint1.id}/upvote/")
        self.assertEqual(r.status_code, 200)
        self.complaint1.refresh_from_db()
        self.assertEqual(self.complaint1.upvote_count, 50)
        self.assertEqual(self.complaint1.priority, Complaint.Priority.MEDIUM)

    def test_upvote_escalates_priority_medium_to_high_at_100(self):
        self._auth_as_citizen1()
        self.complaint1.upvote_count = 99
        self.complaint1.priority = Complaint.Priority.MEDIUM
        self.complaint1.save(update_fields=["upvote_count", "priority"])

        r = self.client.post(f"/api/complaints/{self.complaint1.id}/upvote/")
        self.assertEqual(r.status_code, 200)
        self.complaint1.refresh_from_db()
        self.assertEqual(self.complaint1.upvote_count, 100)
        self.assertEqual(self.complaint1.priority, Complaint.Priority.HIGH)

    def test_confirm_resolution_not_in_resolved_state(self):
        # complaint1 is PENDING
        self._auth_as_citizen1()
        res = self.client.post(f"/api/complaints/{self.complaint1.id}/confirm/", {})
        self.assertEqual(res.status_code, 400)
        body = res.json()
        self.assertIn("error", body)

    def test_confirm_resolution_missing_rating(self):
        self._auth_as_citizen2()
        res = self.client.post(f"/api/complaints/{self.complaint2.id}/confirm/", {"feedback": "ok"}, format="json")
        self.assertEqual(res.status_code, 400)
        self.assertIn("rating", res.json())

    def test_confirm_resolution_rating_out_of_range(self):
        self._auth_as_citizen2()
        res = self.client.post(
            f"/api/complaints/{self.complaint2.id}/confirm/",
            {"rating": 0, "feedback": "bad"},
            format="json",
        )
        self.assertEqual(res.status_code, 400)
        self.assertIn("rating", res.json())

    def test_confirm_resolution_success_closes_complaint(self):
        self._auth_as_citizen2()
        res = self.client.post(
            f"/api/complaints/{self.complaint2.id}/confirm/",
            {"rating": 5, "feedback": "Great service"},
            format="json",
        )
        self.assertEqual(res.status_code, 200)
        self.complaint2.refresh_from_db()
        self.assertEqual(self.complaint2.status, Complaint.Status.CLOSED)
        self.assertIsNotNone(self.complaint2.confirmed_at)
        self.assertEqual(self.complaint2.citizen_rating, 5)
        self.assertEqual(self.complaint2.citizen_feedback, "Great service")
        self.assertTrue(StatusHistory.objects.filter(complaint=self.complaint2, new_status=Complaint.Status.CLOSED).exists())


class AssignmentAndPermissionsValidationTests(CivicFixAPITestBase):
    def test_assign_requires_dept_head_or_admin(self):
        self._auth_as_field_officer()
        res = self.client.patch(
            f"/api/complaints/{self.complaint1.id}/assign/",
            {"officer_id": self.field_officer.id},
            format="json",
        )
        self.assertEqual(res.status_code, 403)

    def test_assign_missing_officer_id_returns_404(self):
        self._auth_as_dept_head()
        res = self.client.patch(
            f"/api/complaints/{self.complaint1.id}/assign/",
            {},
            format="json",
        )
        self.assertEqual(res.status_code, 404)

    def test_assign_officer_wrong_role_returns_404(self):
        self._auth_as_dept_head()
        # Pass dept_head id but assign endpoint requires field_officer role.
        res = self.client.patch(
            f"/api/complaints/{self.complaint1.id}/assign/",
            {"officer_id": self.dept_head.id},
            format="json",
        )
        self.assertEqual(res.status_code, 404)

    def test_assign_success_sets_assigned_to(self):
        self._auth_as_dept_head()
        res = self.client.patch(
            f"/api/complaints/{self.complaint1.id}/assign/",
            {"officer_id": self.field_officer.id},
            format="json",
        )
        self.assertEqual(res.status_code, 200)
        self.complaint1.refresh_from_db()
        self.assertEqual(self.complaint1.assigned_to_id, self.field_officer.id)
        # Side effect: send_status_notification should create a citizen notification of assigned.
        self.assertTrue(Notification.objects.filter(recipient=self.citizen1, type="assigned").exists())


class MapAndLookupValidationTests(CivicFixAPITestBase):
    def test_map_endpoint_public(self):
        # Should not require authentication.
        self.client = APIClient()
        res = self.client.get("/api/complaints/map/")
        self.assertEqual(res.status_code, 200)
        body = res.json()
        data = body.get("results", body) if isinstance(body, dict) else body
        # Ensure closed complaints are excluded.
        complaint_ids = {row["id"] for row in data}
        self.assertNotIn(self.closed_complaint.id, complaint_ids)
        # Ensure open complaints with lat/long show up.
        self.assertIn(self.complaint1.id, complaint_ids)

    def test_categories_only_active_returned(self):
        res = self.client.get("/api/complaints/categories/")
        self.assertEqual(res.status_code, 200)
        body = res.json()
        rows = body.get("results", body) if isinstance(body, dict) else body
        ids = {row["id"] for row in rows}
        self.assertIn(self.active_category.id, ids)
        self.assertNotIn(self.inactive_category.id, ids)

    def test_departments_returns_all(self):
        res = self.client.get("/api/complaints/departments/")
        self.assertEqual(res.status_code, 200)
        body = res.json()
        rows = body.get("results", body) if isinstance(body, dict) else body
        self.assertTrue(any(row["id"] == self.dept.id for row in rows))


class NotificationsValidationTests(CivicFixAPITestBase):
    def test_unread_count(self):
        self._auth_as_citizen1()
        res = self.client.get("/api/notifications/unread/")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(res.json()["unread"], 1)

    def test_mark_all_read(self):
        self._auth_as_citizen1()
        res = self.client.post("/api/notifications/read/")
        self.assertEqual(res.status_code, 200)
        body = res.json()
        self.assertGreaterEqual(body["marked_read"], 0)
        self.assertEqual(Notification.objects.filter(recipient=self.citizen1, is_read=False).count(), 0)

    def test_mark_one_read_only_affects_recipient(self):
        # Mark a notification belonging to citizen1, ensure citizen2 isn't affected.
        self._auth_as_citizen1()
        notif = Notification.objects.filter(recipient=self.citizen1, is_read=False).first()
        res = self.client.post(f"/api/notifications/{notif.id}/read/")
        self.assertEqual(res.status_code, 200)
        self.assertEqual(Notification.objects.filter(recipient=self.citizen2, is_read=False).count(), 1)


class AnalyticsValidationTests(CivicFixAPITestBase):
    def test_analytics_requires_auth(self):
        res = self.client.get("/api/analytics/summary/")
        self.assertEqual(res.status_code, 401)

    def test_summary_admin_sees_all(self):
        self._auth_as_admin()
        res = self.client.get("/api/analytics/summary/")
        self.assertEqual(res.status_code, 200)
        body = res.json()
        self.assertEqual(body["total"], Complaint.objects.count())

    def test_summary_dept_head_filters_by_department(self):
        # Only one department exists in setup, but still validate endpoint works for dept_head role.
        self._auth_as_dept_head()
        res = self.client.get("/api/analytics/summary/")
        self.assertEqual(res.status_code, 200)
        body = res.json()
        self.assertEqual(body["total"], Complaint.objects.filter(department=self.dept).count())

    def test_wards_heatmap_excludes_empty_ward(self):
        self._auth_as_admin()
        res = self.client.get("/api/analytics/wards/")
        self.assertEqual(res.status_code, 200)
        wards = [row["ward"] for row in res.json()]
        self.assertNotIn("", wards)

    def test_department_breakdown_permission(self):
        # field_officer is not admin/dept_head -> should be forbidden.
        self._auth_as_field_officer()
        res = self.client.get("/api/analytics/departments/")
        self.assertEqual(res.status_code, 403)

    def test_department_breakdown_admin_allowed(self):
        self._auth_as_admin()
        res = self.client.get("/api/analytics/departments/")
        self.assertEqual(res.status_code, 200)
        self.assertIsInstance(res.json(), list)


class ComplaintFilterValidationTests(CivicFixAPITestBase):
    @override_settings(DEBUG=False)
    def test_created_after_invalid_date_returns_400(self):
        self._auth_as_citizen1()
        res = self.client.get("/api/complaints/", {"created_after": "not-a-date"})
        self.assertEqual(res.status_code, 400)
        # django-filter returns an error object; exact structure depends on configuration.
        self.assertTrue(isinstance(res.json(), dict))

