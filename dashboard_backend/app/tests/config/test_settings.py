import logging
import importlib
from unittest.mock import patch

def test_load_dotenv_missing(caplog):
    logger_name = "app.config.settings"
    caplog.set_level(logging.ERROR, logger=logger_name)

    settings_module = importlib.import_module("app.config.settings")

    with patch("dotenv.load_dotenv", return_value=False):
        importlib.reload(settings_module)

        assert ".env file not found." in caplog.text
