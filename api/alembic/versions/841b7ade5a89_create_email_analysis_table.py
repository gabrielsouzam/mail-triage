"""create email_analysis table

Revision ID: 841b7ade5a89
Revises: 
Create Date: 2026-01-17 21:32:39.561293

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '841b7ade5a89'
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    op.create_table('email_analysis',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('content_preview', sa.String(length=500), nullable=False),
    sa.Column('content_hash', sa.String(), nullable=False),
    sa.Column('category', sa.Enum('PRODUCTIVE', 'UNPRODUCTIVE', name='email_category'), nullable=False),
    sa.Column('suggested_response', sa.Text(), nullable=False),
    sa.Column('processing_time_ms', sa.Float(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_index(op.f('ix_email_analysis_content_hash'), 'email_analysis', ['content_hash'], unique=True)


def downgrade() -> None:
    """Downgrade schema."""
    op.drop_index(op.f('ix_email_analysis_content_hash'), table_name='email_analysis')
    op.drop_table('email_analysis')
    sa.Enum(name='email_category').drop(op.get_bind(), checkfirst=True)
