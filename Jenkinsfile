#!groovy
import groovy.json.JsonSlurperClassic
node {

    def BUILD_NUMBER=env.BUILD_NUMBER
    def RUN_ARTIFACT_DIR="tests/${BUILD_NUMBER}"
    def SFDC_USERNAME

    def HUB_ORG="sanjaytyagis98@gmail.com"
    def SFDC_HOST ="https://login.salesforce.com"
    def JWT_KEY_CRED_ID ="1c35af1a-d730-4aec-819e-550b68eac48d"
    def CONNECTED_APP_CONSUMER_KEY="3MVG9pRzvMkjMb6nw1u2XeUiiOdyrQJ7wjmPyQH_IR4HqqpvWGZbQcP8cNXdtiCZ5JYR3lMUufEWNkHNK8xTI"

    println 'KEY IS' 
    println JWT_KEY_CRED_ID
    println HUB_ORG
    println SFDC_HOST
    println CONNECTED_APP_CONSUMER_KEY
    def toolbelt = tool 'toolbelt'

    stage('checkout source') {
        // when running in multi-branch job, one must issue this command
        checkout scm
    }

    withCredentials([file(credentialsId: JWT_KEY_CRED_ID, variable: 'jwt_key_file')]) {
        stage('Deploye Code') {
            if (isUnix()) {
		println jwt_key_file
		def checkCommanmd = "${toolbelt} sfdx auth:jwt:grant --clientid ${CONNECTED_APP_CONSUMER_KEY} --username ${HUB_ORG} --jwtkeyfile ${jwt_key_file} --setdefaultdevhubusername --instanceurl ${SFDC_HOST}"
		println checkCommanmd                
		rc = command checkCommanmd
            	println checkCommanmd
}
            if (rc != 0) { error 'hub org authorization failed' }

			println rc
			
			// need to pull out assigned username
			if (isUnix()) {
				rmsg = sh returnStdout: true, script: "${toolbelt} sfdx force:mdapi:deploy -d manifest/. -u ${HUB_ORG}"
			}
			  
            printf rmsg
            println('Hello from a Job DSL script!')
            println(rmsg)
        }
    }
} 
