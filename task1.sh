docker pull busybox
docker run --name pinger -i busybox ping -c 7 netology.ru
docker ps -a
docker logs pinger
docker start pinger -i
docker ps -a
docker logs pinger
echo '2 запуска 14 логов'
docker rm pinger
docker rmi busybox
