FROM node:20-alpine as base
ARG USERID=1000
ARG USERNAME=node
RUN mkdir -p /home/${USERNAME}
RUN apk add --no-cache bash \
    nano \ 
    bash shadow \
    iputils-ping && \
    usermod -u ${USERID} ${USERNAME} -d /home/${USERNAME} && \
    groupmod -g ${USERID} ${USERNAME}
RUN npm install -g serve
EXPOSE 5173

RUN echo 'export PS1="\e[0;35m\e[0;37m\u-container-\h\e[0;32m\w\e\[\033[00m\]\$ "'>> /etc/profile.d/settings-terminal.sh
WORKDIR /app
COPY ./docker/client/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

USER node
ENTRYPOINT [ "bash", "-c","/entrypoint.sh" ]