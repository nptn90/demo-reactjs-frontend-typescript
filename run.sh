cp /var/project/js/config.template.js /var/project/js/config.js
sed -i "s|{{REACT_APP_HELLO_STRING}}|$REACT_APP_HELLO_STRING|g" /var/project/js/config.js
sed -i "s|{{REACT_APP_BASE_URL}}|$REACT_APP_BASE_URL|g" /var/project/js/config.js
echo 'after update'
cat /var/project/js/config.js
nginx -g 'daemon off;'