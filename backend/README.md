# seaclub-backend-microservices

Follow steps below to run our project on your local machine.

1. Setting up Kubernetes:   
   * For windows or Mac, either just enable kuberenetes from docker desktop, or setting up minikube on your machine.
   * For Linux, you have to install and setup minikube.
   * To setup minikube: https://minikube.sigs.k8s.io/docs/start/
  
2. Create secrets:
    Create secrets by running commands in kubectl.sh. Incase you need to delete secretets: ```kubectl delete secret <key>```

3. Install Skaffold: Follow steps in this link to get skaffold installed: https://skaffold.dev/docs/quickstart/

4. run **skaffold dev**
   * **skaffold delete**, to remove running containers