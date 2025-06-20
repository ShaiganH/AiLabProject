Adding Instructions for best practices. Please follow these:


main — the production-ready branch (only tested, working code goes here).
dev — the integration branch where team members merge their features.

Each person creates their own working branches:
frontend/<name> (e.g. frontend/ahmed-navbar)
backend/<name> (e.g. backend/shaigan-auth)
ml/<name> (e.g. ml/hassan-model-v1)


Example structure:
main
  └─ dev
       ├─ frontend/ahmed-navbar
       ├─ backend/shaigan-auth
       └─ ml/hassan-model-v1

       
✅ Step 4: Git Workflow
Each team member:
Creates their own feature branch from dev:
git checkout dev
git pull origin dev
git checkout -b frontend/ahmed-navbar
Commits regularly with clear messages:


git add .
git commit -m "Added login page with basic styling"
Pushes branch to GitHub:


git push origin frontend/ahmed-navbar
✅ Step 5: Pull Requests (PRs)
Once a feature is done:

Go to GitHub → Compare & Pull Request
Merge into dev only after code is reviewed by at least one teammate.
Only merge dev → main when everyone agrees it’s stable (maybe once a sprint/week).

