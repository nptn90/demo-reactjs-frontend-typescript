FROM nginx:1.15.2-alpine
COPY ./build /var/project
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80 8085
ENTRYPOINT ["nginx","-g","daemon off;"]