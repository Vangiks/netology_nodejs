docker pull node:15.14
docker run --name mynode --env NAME=Иван --env SURNAME=Выдуйкин -t -i --rm node:15.14
# docker run --name mynode --env-file .env -t -i --rm node:15.14
# console.log(`Привет, ${process.env.NAME} ${process.env.SURNAME}`)
# Ctrl+C
docker rmi node:15.14