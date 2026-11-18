
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
        
    )

    database_url: str
    admin_email: str = "admin@helpdesk.com"
    admin_password: str
    secret_key: str
    access_token_expire_minutes: int = 60
    cors_origins: str = "http://localhost:4200"

settings = Settings()
