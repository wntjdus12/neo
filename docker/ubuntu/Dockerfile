# Step1 : Base Images
FROM ubuntu/nginx

# Step2 : Install Progrem
RUN apt -y update; apt -y upgrade; apt -y install -q nginx; apt -y install vim 

# Step3 : File Copy
COPY index.html /var/www/html

# Step4 : Start Nginx
CMD ["nginx", "-g", "deamon off;"]
