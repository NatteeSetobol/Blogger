#//bin/bash

echo "Building React app..."
cd ./Frontend/blogger
rm -rf build > /dev/null
npm run build
echo "Copying files to spring tools..."
cd build
if [ -d "../../../Backend/src/main/resources/public" ]; then
	rm -rf ../../../Backend/src/main/resources/public > /dev/null
fi
mkdir ../../../Backend/src/main/resources/public
cp -rf ./* ../../../Backend/src/main/resources/public
cd ../../../Backend/
mvn clean
mvn install
cd target
java -jar *.jar
