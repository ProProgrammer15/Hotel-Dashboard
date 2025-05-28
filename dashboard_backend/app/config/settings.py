import logging
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

log = logging.getLogger(__name__)
if not load_dotenv():
    log.error(".env file not found.")


class ApplicationSettings(BaseSettings):
    """Define application configuration model.

    Constructor will attempt to determine the values of any fields not passed
    as keyword arguments by reading from the environment. Default values will
    still be used if the matching environment variable is not set.
    """

    PROJECT_NAME: str = "HOTEL DASHBOARD BACKEND"
    DOCS_URL: str = "/docs"
    DEBUG: bool = True
    PRODUCTION: bool = False

    class Config:
        case_sensitive = True


settings = ApplicationSettings()
