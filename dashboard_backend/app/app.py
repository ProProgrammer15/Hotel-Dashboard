import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from .routers import root_api_router
from app.config.database import create_tables
from fastapi.staticfiles import StaticFiles

logger = logging.getLogger(__name__)


async def on_startup() -> None:
    """Define FastAPI startup event handler.

    Resources:
        1. https://fastapi.tiangolo.com/advanced/events/#startup-event

    """

    logger.debug("Initializing FastAPI application node.")
    create_tables()



async def on_shutdown() -> None:
    """Define FastAPI shutdown event handler.

    Resources:
        1. https://fastapi.tiangolo.com/advanced/events/#shutdown-event

    """
    logger.debug("Execute FastAPI shutdown event handler.")



def get_application() -> FastAPI:
    """Initialize FastAPI application.

    """

    logger.debug("Initialize FastAPI application node.")
    app = FastAPI(
        title=settings.PROJECT_NAME,
        debug=settings.DEBUG,
        docs_url=settings.DOCS_URL,
        on_startup=[on_startup],
        on_shutdown=[on_shutdown],
    )
    app.mount("/uploaded_images", StaticFiles(directory="uploaded_images"), name="uploaded_images")
    app.add_middleware(CORSMiddleware,
                       allow_origins=['*'],
                       allow_credentials=True,
                       allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
                       allow_headers=["*"]
                       )

    logger.debug("Add application routes.")
    app.include_router(root_api_router)

    return app