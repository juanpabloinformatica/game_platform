FROM mysql:oracle
# USER user
# RUN whoami
COPY ./database/init.sql /docker-entrypoint-initdb.d/
RUN chown -R mysql:mysql /docker-entrypoint-initdb.d/


