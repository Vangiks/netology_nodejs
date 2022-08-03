docker pull node:15.14
docker run --name first_node -d -t -v %cd%/data:/var/first/data node:15.14
docker run --name second_node -d -t -v %cd%/data:/var/second/data node:15.14
docker exec first_node touch /var/first/data/text.txt
docker exec second_node ls /var/second/data
docker stop first_node second_node
docker rm first_node second_node
docker rmi node:15.14