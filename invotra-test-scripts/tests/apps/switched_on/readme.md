# Important notice
**There is the issue HOINC-183 that prevent users to fill comment form. 
The author text format should be disabled for Ideas administrator user role to have tests works**


## Product options are enabled:
- Invotra Ideas
- Anonymous content access

## Content on the site
- **Site sections**

Field  | Value
---|---
Title  | Switched On

- **Nodes**

Field  | Value
|---|---|
|Type|Webform|
|Title|Ideas|
|Worflow|Published|
|**Webform fields**||
|First name| [current-user:field_forename]|
|Surname| [current-user:field-surname]|
|email| [current-user:mail]|
|Your business area (Organisational unit) | [current-user:field-organisational-unit]|


Field  | Value
|---|---|
|Type|idea|
|Title|TestIdea|
|Featured item|Yes|
|Worflow|Published|
|Author|org|

- **Comments**

Field  | Value
|---|---|
|Node url|idea/testidea|
|Comment body|test comment|
|Author|org|

## Widgets on the site
|Configurable search widget|Settings|
|---|---|
|Placed on site section|Switched On|
|Display all results|Yes|
|Content types| Idea|

|Webfrom widget|Settings|
|---|---|
|Placed on site section|Switched On|
|Select Webform|Idea|

|Ideas reports link|Settings|
|---|---|
|Placed on site section|Switched On|

|View: Ideas: Successful Ideas|Settings|
|---|---|
|Placed on site section|Switched On|

|View: Ideas: Featured ideas|Settings|
|---|---|
|Placed on site section|Switched On|

|View: OG Ideas admin list: Site section administrators|Settings|
|---|---|
|Placed on site section|Switched On|

## Users exist on the site
- username: org
- password: org
- email: org@org.com
- roles: Organisational user

---

- username: organisational user
- password: organisational user
- email: organisational@org.com
- roles: Organisational user
- Forename: OrgForename
- Surname: UserForename
- Organisational unit: Default OU

---

- username: editor
- password: editor
- email: editor@editor.com
- roles: Organisational user, editor

----

- username: ed
- password: ed
- email: ed@ed.com
- roles: Organisational user, editor

----

- username: ideaadministrator
- password: ideaadministrator
- email: ideaadministrator@idea.com
- roles: Organisational user, Ideas administrator
- OG: Swithced On



