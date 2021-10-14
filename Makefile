#Dev (Local)
build-dev:
	cd client && $(MAKE) build-dev
	cd server && $(MAKE) build

run-dev:
	docker-compose -f docker-compose-dev.yml up

develop: 
	$(MAKE) build-dev && $(MAKE) run-dev


#Caddy Webserver (local)
build-local:
	cd client && $(MAKE) build-local
	cd server && $(MAKE) build

run-local:
	ENV=local docker-compose -f docker-compose-production.yml up


#Production (not local)
build-production:
	cd client && $(MAKE) build-production
	cd server && $(MAKE) build

run-production:
	ENV=production docker-compose -f docker-compose-production.yml up

#Change SSH string when making a new droplet
SSH_STRING:=root@142.93.117.89

ssh:
	ssh $(SSH_STRING)

copy-files:
	scp -r ./* $(SSH_STRING):/root/

produce: 
	cd client && rm -rf node_modules/
	cd server && rm -rf node_modules/
	$(MAKE) copy-files 
	$(MAKE) ssh

#Run these commands in the shell
#$(MAKE) build-production
#$(MAKE) run-production


#Copy code to machine (usually there would be some sort of CI/CD here)



