ps -ef | grep "mentaltal-0.0.1-SNAPSHOT.jar" | grep -v grep | awk '{print $2}' | xargs kill -9 2> /dev/null

if [ $? -eq 0 ];then
    echo "mentaltal Stop Success"
else
    echo "mentaltal-application Not Running"
fi

echo "mentaltal-application Restart!"
echo $1

nohup java -jar build/libs/mentaltal-0.0.1-SNAPSHOT.jar --spring.profiles.active=server > /dev/null 2>&1 &