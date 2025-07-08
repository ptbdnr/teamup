
## :wrench: Developer Guide

### Copy the environment variables to the project root

source: ask!

for sample: see `path/to/repo_root/.env.sample`

```shell
ln path/to/repo_root/.env.local /path/to/project_root/.env.local
```

or

```shell
cat << EOF > .env.local
KEY1=VALUE1
KEY2=VALUE2
EOF
```

### Create the environment and install dependencies

```shell
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

