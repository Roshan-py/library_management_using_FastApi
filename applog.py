import logging
import logging.handlers
logger = None
import os

log_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'logs')
if not os.path.exists(log_dir):
    os.makedirs(log_dir)
# os.path.abspath(os.path.dirname(__file__))
log_fname = os.path.join(log_dir, 'server.log')
logger = logging.getLogger("applog")
logger.setLevel(logging.DEBUG)
formatter = logging.Formatter('%(levelname)s : %(asctime)s : %(message)s')
handler = logging.handlers.RotatingFileHandler(log_fname, maxBytes=5000000, backupCount=10)
handler.setFormatter(formatter)
# handler = logging.handlers.TimedRotatingFileHandler("error.log", when="midnight", interval=1, backupCount=15)
logger.addHandler(handler)