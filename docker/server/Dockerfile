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

RUN echo 'export PS1="\e[0;35m\e[0;37m\u-container-\h\e[0;32m\w\e\[\033[00m\]\$ "'>> /etc/profile.d/settings-terminal.sh
WORKDIR /app
USER node
EXPOSE 3001
ENTRYPOINT [ "bash","-c","npm install && node index.js" ]