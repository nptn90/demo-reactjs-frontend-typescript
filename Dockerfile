FROM nginx:latest
COPY ./build /var/project
COPY nginx.conf /etc/nginx/nginx.conf
COPY run.sh /config/run.sh
COPY .env /config/.env
RUN chmod +x /config/run.sh
EXPOSE 80 8085
#ENTRYPOINT ["nginx","-g","daemon off;"]
ENTRYPOINT ["/bin/bash", "/config/run.sh"]