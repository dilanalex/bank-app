# Banking System 
# - Dilan Silva

### Prerequisites
* java 1.8.x
* maven 3.x

### Technologies and Tools and Libararies used to develop the project
* Spring Boot
* TypeScript (front end)
* Paper UI Kit (https://www.creative-tim.com/product/paper-kit-2-angular#) Free version
* MongoDB


**Mongo DB Atlas Cluster Setup**

https://www.mongodb.com/basics/mongodb-atlas-tutorial

Create mongodb cloud account (free account)
Configure atlas cluster and configure the atles cluster.

Create Database with name banking_app

Click on connect and find the below URL to connect

`mongodb+srv://<username>:<password>@cluster0.8ujrdnk.mongodb.net/?retryWrites=true&w=majority`

Replace the database username and password to the URL copied.
Update the `spring.data.mongodb.uri` in the `application.properties` file

### Steps To Setup

**2. Build project**
```bash
    mvn clean install
``` 

**3. Run project** 
```bash
    mvn spring-boot:run
```

**4. Open url**  
  
Open following url.
```
   http://localhost:8080/ 
```

  ## APIs

The app defines following APIs. 
 
```   
    POST /api/signup   
    POST /api/user
    GET /api/user
    PUT /api/user
    GET /api/account
    POST /api/transfer
    GET /api/transaction      
```
 Resources

 https://www.baeldung.com/spring-security-authentication-mongodb
 https://www.baeldung.com/spring-security-basic-authentication