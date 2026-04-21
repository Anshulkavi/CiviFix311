"""
Test-only settings.

This project’s default DATABASES points to PostgreSQL, but local/test environments
often lack permissions to create a new test DB. For reliable test execution,
we switch to SQLite when running the Django test runner.
"""

from .settings import *  # noqa: F403

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": str(BASE_DIR / "test_db.sqlite3"),
    }
}

