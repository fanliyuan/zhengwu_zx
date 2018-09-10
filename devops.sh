 if [ ! -d "node_modules" ];then
    npm install
  fi
  npm run build
  
  echo "RUN sed -i 's#location / {#location / {\n\t\ttry_files $uri /index.html;#' /etc/nginx/conf.d/default.conf" >> Dockerfile