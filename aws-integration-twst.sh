echo "Integration test ...."

aws --version

Data=$(aws ec2 describe-instances )
echo "Data - $Data"
URL=$(aws ec2 describe-instances | jq -r '.Reservations[].Instances[] | select(.Tags[].Value == "ubuntu2") | .PublicDnsName')
echo "URL - $URL"

if [[ "$URL" != '' ]]; then
http_code=$(curl -s -o /dev/null -w "%{http_code}" http://$URL:3000/live)
    echo "http_code - $http_code"
planet_data=$(curl -s -XPOST http://$URL:3000/planet -H "Content-Type: application/json" -d '{"id "3}')
    echo "planet_data - $planet_data"

planet_name=$(echo $planet_data | jq .name -r )
    echo "planet_name - $planet_name"

    if [[ "$http_code" -eq 200 && "$planet_name" -eq "Earth" ]]; then
        echo "Integration test passed"
        exit 0
    else
        echo "Integration test failed"
        exit 1
    fi;

else
    echo "Could not find the URL"
    exit 1
fi