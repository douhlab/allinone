FROM ghcr.io/nginx:latest

COPY --chown=nginx:root deploy/nginx.conf $NGINX_CONF_PATH
COPY --chown=nginx:root deploy/*.template /etc/nginx/templates/
COPY --chown=nginx:root deploy/*.envsh /docker-entrypoint.d/
COPY --chown=nginx:root deploy/*.sh /docker-entrypoint.d/
COPY --chown=nginx:root dist/ $APP_PATH
EXPOSE 8080/tcp

LABEL io.k8s.display-name allinone
LABEL io.k8s.description allinone
LABEL description allinone
LABEL maintainer Me
LABEL name allinone
