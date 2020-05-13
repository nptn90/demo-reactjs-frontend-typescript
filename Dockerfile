FROM nginx:latest
COPY ./build /var/project
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 8085
ENTRYPOINT ["nginx","-g","daemon off;"]