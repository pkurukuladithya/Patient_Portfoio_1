"""create patients table

Revision ID: 20260223_152500
Revises: 
Create Date: 2026-02-23 15:25:00
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "20260223_152500"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    gender_enum = sa.Enum("Male", "Female", "Other", "PreferNotToSay", name="gender_enum")
    gender_enum.create(op.get_bind(), checkfirst=True)

    op.create_table(
        "patients",
        sa.Column("id", postgresql.UUID(as_uuid=True), primary_key=True, nullable=False),
        sa.Column("first_name", sa.String(length=100), nullable=False),
        sa.Column("last_name", sa.String(length=100), nullable=False),
        sa.Column("dob", sa.Date(), nullable=False),
        sa.Column("gender", gender_enum, nullable=True),
        sa.Column("phone", sa.String(length=50), nullable=True),
        sa.Column("email", sa.String(length=255), nullable=True),
        sa.Column("address", sa.Text(), nullable=True),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), server_default=sa.text("now()"), nullable=False),
    )


def downgrade() -> None:
    op.drop_table("patients")
    sa.Enum("Male", "Female", "Other", "PreferNotToSay", name="gender_enum").drop(op.get_bind(), checkfirst=True)
