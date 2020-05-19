cp /var/project/js/config.template.js /var/project/js/config.js
touch /var/project/js/config.js
while IFS='' read -r line || [ "$line" ];
do
  # Split env variables by character `=`
  if printf '%s\n' "$line" | grep -q -e '=';
  then
    env_name=$(printf '%s\n' "$line" | sed -e 's/=.*//')
    env_value=$(printf '%s\n' "$line" | sed -e 's/^[^=]*=//')
  fi
  # get current system variable
  value=$(printf '%s\n' "${!env_name}")
  echo "$env_name: \"$env_value\" , $value"
  # replace in config file
  sed -i "s|{{$env_name}}|$value|g" /var/project/js/config.js
done < /config/.env
echo 'after update'
cat /var/project/js/config.js
nginx -g 'daemon off;'