const logoBase64 = `PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iMzguNzU0MjQybW0iCiAgIGhlaWdodD0iMTAuNjU0NzY5bW0iCiAgIHZlcnNpb249IjEuMSIKICAgdmlld0JveD0iMCAwIDM4Ljc1NDI0MSAxMC42NTQ3NjkiCiAgIGlkPSJzdmc2IgogICBzb2RpcG9kaTpkb2NuYW1lPSJjb21ldC1mdWxsLnN2ZyIKICAgaW5rc2NhcGU6dmVyc2lvbj0iMS4xIChjNjhlMjJjMzg3LCAyMDIxLTA1LTIzKSIKICAgeG1sbnM6aW5rc2NhcGU9Imh0dHA6Ly93d3cuaW5rc2NhcGUub3JnL25hbWVzcGFjZXMvaW5rc2NhcGUiCiAgIHhtbG5zOnNvZGlwb2RpPSJodHRwOi8vc29kaXBvZGkuc291cmNlZm9yZ2UubmV0L0RURC9zb2RpcG9kaS0wLmR0ZCIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzMTAiIC8+CiAgPHNvZGlwb2RpOm5hbWVkdmlldwogICAgIGlkPSJuYW1lZHZpZXc4IgogICAgIHBhZ2Vjb2xvcj0iI2ZmZmZmZiIKICAgICBib3JkZXJjb2xvcj0iIzY2NjY2NiIKICAgICBib3JkZXJvcGFjaXR5PSIxLjAiCiAgICAgaW5rc2NhcGU6cGFnZXNoYWRvdz0iMiIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMC4wIgogICAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjAiCiAgICAgaW5rc2NhcGU6ZG9jdW1lbnQtdW5pdHM9Im1tIgogICAgIHNob3dncmlkPSJmYWxzZSIKICAgICBpbmtzY2FwZTp6b29tPSI0Ljk3ODc4NTUiCiAgICAgaW5rc2NhcGU6Y3g9IjQ2Ljc5ODU2MiIKICAgICBpbmtzY2FwZTpjeT0iMi41MTA2NTI0IgogICAgIGlua3NjYXBlOndpbmRvdy13aWR0aD0iMTkyMCIKICAgICBpbmtzY2FwZTp3aW5kb3ctaGVpZ2h0PSI5OTEiCiAgICAgaW5rc2NhcGU6d2luZG93LXg9Ii05IgogICAgIGlua3NjYXBlOndpbmRvdy15PSItOSIKICAgICBpbmtzY2FwZTp3aW5kb3ctbWF4aW1pemVkPSIxIgogICAgIGlua3NjYXBlOmN1cnJlbnQtbGF5ZXI9InN2ZzYiIC8+CiAgPHBhdGgKICAgICBkPSJtIDIuODcwNTQ5LDEwLjY0NzMxMSBjIC0xLjAwNzUsLTAuMDcwOTQgLTEuOTA4OTk5OTksLTAuNjI1MzcgLTIuNDM2MTk5OTksLTEuNDk4MiAtMC4yMzU2NCwtMC4zOTAxMyAtMC4zNzg1OSwtMC44MjUxIC0wLjQyMzY5LC0xLjI4OTIgLTAuMDEyNzIsLTAuMTMwOTMgLTAuMDE0MzksLTAuNDE2NDQgLTAuMDAzMiwtMC41NDYwNiAwLjA1ODc1LC0wLjY3OTcyIDAuMzM3OTksLTEuMzE0NyAwLjgsLTEuODE5MyAwLjU0NzI3OTk5LC0wLjU5NzcgMS41NDg1OTk5OSwtMS4zMTcyIDMuMzI3NTk5OTksLTIuMzkxIDAuNTgxMDgsLTAuMzUwNzQgMS40ODMzLC0wLjg3MTE2IDIuMDQwNiwtMS4xNzcxIDAuMzUwMjQsLTAuMTkyMjYgMS4zNzI0LC0wLjc0NjE4IDEuMzc0NCwtMC43NDQ3OSAwLjAwMTEsNy45ZS00IC0wLjE0ODcyLDAuMjgxNzkgLTAuMzMyOTcsMC42MjQ0NCAtMC4xODQyNSwwLjM0MjY1IC0wLjMzMzgyLDAuNjI0MTkgLTAuMzMyMzcsMC42MjU2NCAwLjAwMTQsMC4wMDE0IDAuNDMyNTgsLTAuMjgyMTQgMC45NTgwNywtMC42MzAyIDAuNzQ0MDgsLTAuNDkyODQgMi42NzQ5LC0xLjc2MzIwMDAxIDIuNzMzNywtMS43OTg2MDAwMSAwLjAwOTIsLTAuMDA1NiAwLjAwOTEsLTAuMDAzOTAwMDAyIC01LjFlLTQsMC4wMTEyIC0wLjQ3NzQ3LDAuNzQ4MDQgLTIuODgwMiw0LjU0MzYwMDAxIC0yLjg3NzgsNC41NDYwMDAwMSAwLjAwMzksMC4wMDM5IDAuMjgyNDgsLTAuMDk0MzQgMC43NjU5LC0wLjI3MDIzIDAuMjU4ODQsLTAuMDk0MTggMC40NzE3NSwtMC4xNzAzMSAwLjQ3MzEzLC0wLjE2OTE5IDAuMDAzMywwLjAwMjcgLTAuNjc3NTQsMS4yMzE5IC0wLjg0MTQ3LDEuNTE5MSAtMC45NzE0NCwxLjcwMTcgLTEuOTAxNCwzLjA3ODQgLTIuNjE2MywzLjg3MjggLTAuMTI2MDMsMC4xNDAwNSAtMC4zMDY2MywwLjMyMDQ0IC0wLjQwMjc1LDAuNDAyMjYgLTAuNjE1NywwLjUyNDEgLTEuNDExOSwwLjc4ODQ2IC0yLjIwNjIsMC43MzI1MiB6IG0gMC40Nzc4MSwtMC44NjUzIGMgMC4yNDk4MywtMC4wMzM0OCAwLjQ2MTU3LC0wLjA5Nzg2IDAuNjg2MTcsLTAuMjA4NjEgMC4zNDM2MSwtMC4xNjk0NCAwLjU3NjI0LC0wLjM2ODM1IDAuOTQwOTIsLTAuODA0NTMgMC40NjIwNiwtMC41NTI2NSAxLjExNDIsLTEuNDk1IDEuNzA4NywtMi40Njg5IDAuMTM0NiwtMC4yMjA1MSAwLjMzNjkxLC0wLjU2ODA2IDAuMzMyOTcsLTAuNTcyIC0wLjAwMTksLTAuMDAxOSAtMC4wNDY1MSwwLjAxMTgzIC0wLjA5OTEzLDAuMDMwNTEgLTAuMDUyNjIsMC4wMTg2OCAtMC4zNjY5NiwwLjEzMDYgLTAuNjk4NTIsMC4yNDg3MSAtMC4zMzE1NiwwLjExODExIC0wLjYwMzQ2LDAuMjEzODkgLTAuNjA0MiwwLjIxMjg1IC03LjQ0ZS00LC0wLjAwMSAwLjEzNzgxLC0wLjIxODUzIDAuMzA3OSwtMC40ODMzIDAuMzMyOTYsLTAuNTE4MjkgMS43NTAyLC0yLjc2NDcgMS43NDY4LC0yLjc2ODYgLTAuMDAxMiwtMC4wMDEzIC0wLjMyOTc2LDAuMjE1MTkgLTAuNzMwMjMsMC40ODEwOCAtMS45NDE2LDEuMjg5MiAtMi40ODgsMS42NTEgLTIuNDkwMSwxLjY0ODggLTAuMDAzMSwtMC4wMDMxIDAuNzk3ODIsLTEuNDg3IDAuODYwOTYsLTEuNTk1MSAwLjAyNzQ0LC0wLjA0NyAwLjA0ODg3LC0wLjA4NjQ4IDAuMDQ3NjIsLTAuMDg3NzMgLTAuMDAzMywtMC4wMDMzIC0wLjUwMzUsMC4yNzU2MyAtMC42NTE5LDAuMzYzNDggLTAuODczMTMsMC41MTY5MiAtMS44Mzk5LDEuMTUzNyAtMi40NTM1LDEuNjE2IC0wLjI4NDgyLDAuMjE0NiAtMC40NTgyMiwwLjM1NzcgLTAuNjM3MjcsMC41MjU5NSAtMC4wNTAwNywwLjA0NzA1IC0wLjA5Mzk0LDAuMDg1NTQgLTAuMDk3NDksMC4wODU1NCAtMC4wMDM2LDAgLTAuMDMyNCwwLjAyODI5IC0wLjA2NDEsMC4wNjI4NyAtMC4zMzU4NiwwLjM2NjM3IC0wLjUzMzc1OTk5LDAuNzkxMzEgLTAuNTg4MDU5OTksMS4yNjI3IC0wLjAxNDAyLDAuMTIxNzQgLTAuMDEzOTcsMC4zNjA2NiAxLjA5ZS00LDAuNDgxMDMgMC4wNzEwMSwwLjYwNzA0IDAuMzkxNDM5OTksMS4xNTc3IDAuODk0NDQ5OTksMS41MzcyIDAuMzQwMjMsMC4yNTY2OSAwLjcxMzM0LDAuNDAxMTYgMS4xNDI0LDAuNDQyMzcgMC4wOTMyMiwwLjAwOSAwLjM0NDc3LDAuMDAzMSAwLjQ0NTQ3LC0wLjAxMDQ0IHoiCiAgICAgZmlsbD0iI2ZmZmZmZiIKICAgICBzdHJva2Utd2lkdGg9IjAuMDA3MTg1MSIKICAgICBpZD0icGF0aDIiCiAgICAgc3R5bGU9ImZpbGw6IzFjMzBlMztmaWxsLW9wYWNpdHk6MSIgLz4KICA8ZwogICAgIGFyaWEtbGFiZWw9IkNvbWV0IgogICAgIGlkPSJ0ZXh0MTU3MSIKICAgICBzdHlsZT0iZm9udC1zaXplOjEwLjU4MzNweDtsaW5lLWhlaWdodDoxLjI1O3N0cm9rZS13aWR0aDowLjI2NDU4MyIKICAgICB0cmFuc2Zvcm09Im1hdHJpeCgwLjcyNjczMDg1LDAsMCwwLjcyNjczMDg1LDI1LjMyNjg0OCwxNC4yNzE5MDgpIj4KICAgIDxwYXRoCiAgICAgICBkPSJtIC0xMy42NDM4MzEsLTguNDE4NTI3NSBjIDEuOTY4NDkzLDAgMy40ODE5MDUsLTEuMzIyOTEyNSAzLjc2NzY1NDIsLTMuMjcwMjM5NSBoIC0yLjA4NDkxMDIgYyAtMC4yMTE2NjYsMC44MjU0OTcgLTAuODU3MjQ3LDEuMzY1MjQ2IC0xLjY4Mjc0NCwxLjM2NTI0NiAtMS4wNDc3NDcsMCAtMS44MjAzMjgsLTAuODM2MDgxIC0xLjgyMDMyOCwtMS45NzkwNzcgMCwtMS4xNDI5OTcgMC43NzI1ODEsLTEuOTg5NjYxIDEuODIwMzI4LC0xLjk4OTY2MSAwLjc4MzE2NCwwIDEuNDE4MTYyLDAuNDk3NDE1IDEuNjcyMTYxLDEuMjQ4ODMgaCAyLjA3NDMyNjYgYyAtMC4zMDY5MTU2LC0xLjg3MzI0NCAtMS44MDk3NDQ2LC0zLjE1MzgyNCAtMy43NDY0ODc2LC0zLjE1MzgyNCAtMi4yNTQyNDMsMCAtMy45MzY5ODgsMS42NzIxNjIgLTMuOTM2OTg4LDMuODk0NjU1IDAsMi4yMTE5MDkgMS42ODI3NDUsMy44ODQwNzA1IDMuOTM2OTg4LDMuODg0MDcwNSB6IgogICAgICAgc3R5bGU9ImZvbnQtZmFtaWx5Ok1vbnQ7LWlua3NjYXBlLWZvbnQtc3BlY2lmaWNhdGlvbjpNb250IgogICAgICAgaWQ9InBhdGg1NjU1IiAvPgogICAgPHBhdGgKICAgICAgIGQ9Im0gLTYuMTI5NzA0OCwtOC40MTg1Mjc1IGMgMS44NjI2NjA3LDAgMy4yMDY3Mzk4LC0xLjI4MDU3OTMgMy4yMDY3Mzk4LC0zLjA0Nzk5MDUgMCwtMS43Njc0MTEgLTEuMzQ0MDc5MSwtMy4wMzc0MDcgLTMuMjA2NzM5OCwtMy4wMzc0MDcgLTEuODYyNjYwOCwwIC0zLjE5NjE1NjUsMS4yNjk5OTYgLTMuMTk2MTU2NSwzLjAzNzQwNyAwLDEuNzY3NDExMiAxLjMzMzQ5NTcsMy4wNDc5OTA1IDMuMTk2MTU2NSwzLjA0Nzk5MDUgeiBtIDAsLTEuNzY3NDExNSBjIC0wLjcwOTA4MTEsMCAtMS4yMjc2NjI4LC0wLjUxODU4MSAtMS4yMjc2NjI4LC0xLjI2OTk5NiAwLC0wLjc2MTk5NyAwLjUxODU4MTcsLTEuMjgwNTc5IDEuMjI3NjYyOCwtMS4yODA1NzkgMC43MTk2NjQzLDAgMS4yMzgyNDYsMC41MjkxNjUgMS4yMzgyNDYsMS4yODA1NzkgMCwwLjc1MTQxNSAtMC41MTg1ODE3LDEuMjY5OTk2IC0xLjIzODI0NiwxLjI2OTk5NiB6IgogICAgICAgc3R5bGU9ImZvbnQtZmFtaWx5Ok1vbnQ7LWlua3NjYXBlLWZvbnQtc3BlY2lmaWNhdGlvbjpNb250IgogICAgICAgaWQ9InBhdGg1NjU3IiAvPgogICAgPHBhdGgKICAgICAgIGQ9Im0gNC43MTgxNzU0LC0xNC40ODI3NTggYyAtMC43MDkwODExLDAgLTEuMzQ0MDc5MSwwLjMxNzQ5OSAtMS43NTY4Mjc4LDAuODM2MDggLTAuMzU5ODMyMiwtMC41MjkxNjUgLTAuOTQxOTEzNywtMC44MzYwOCAtMS42NDA0MTE0LC0wLjgzNjA4IC0wLjY1NjE2NDYxLDAgLTEuMjU5NDEyNjksMC4yOTYzMzIgLTEuNjcyMTYxMzgsMC43ODMxNjQgbCAtMC4yNzUxNjU3OSwtMC42MjQ0MTUgSCAtMi4wMTI4MDMyIHYgNS43MTQ5ODIxIGggMS45Njg0OTM3MSB2IC0zLjEzMjY1NzEgYyAwLC0wLjcwOTA4MSAwLjI5NjMzMjM5LC0xLjA5MDA3OSAwLjgyNTQ5NzM4LC0xLjA5MDA3OSAwLjQxMjc0ODcxLDAgMC42MzQ5OTgwMSwwLjMwNjkxNSAwLjYzNDk5ODAxLDAuODg4OTk3IHYgMy4zMzM3MzkxIGggMS45MTU1NzcyIHYgLTMuMTMyNjU3MSBjIDAsLTAuNzE5NjY0IDAuMjc1MTY1OCwtMS4wOTAwNzkgMC44MTQ5MTQxLC0xLjA5MDA3OSAwLjQyMzMzMiwwIDAuNjM0OTk3OSwwLjI4NTc0OSAwLjYzNDk5NzksMC44ODg5OTcgdiAzLjMzMzczOTEgaCAxLjk2ODQ5MzggdiAtMy41NzcxNTUxIGMgMCwtMS4zNDQwNzkgLTAuODA0MzMwOCwtMi4yOTY1NzYgLTIuMDMxOTkzNSwtMi4yOTY1NzYgeiIKICAgICAgIHN0eWxlPSJmb250LWZhbWlseTpNb250Oy1pbmtzY2FwZS1mb250LXNwZWNpZmljYXRpb246TW9udCIKICAgICAgIGlkPSJwYXRoNTY1OSIgLz4KICAgIDxwYXRoCiAgICAgICBkPSJtIDEzLjgwOTIyMSwtMTEuNTE5NDM0IGMgMCwtMS42NzIxNjIgLTEuMjY5OTk2LC0yLjk4NDQ5MSAtMy4xMTE0OSwtMi45ODQ0OTEgLTEuNzk5MTYwOCwwIC0zLjEwMDkwNjcsMS4yOTExNjMgLTMuMTAwOTA2NywzLjAzNzQwNyAwLDEuNzQ2MjQ0NiAxLjMxMjMyOTIsMy4wNDc5OTA1IDMuMTAwOTA2NywzLjA0Nzk5MDUgMS40Mjg3NDYsMCAyLjU5MjkwOSwtMC44MTQ5MTQxIDIuOTk1MDc0LC0yLjExNjY1OTUgaCAtMS45Njg0OTQgYyAtMC4xNzk5MTYsMC4zMzg2NjUgLTAuNTcxNDk4LDAuNTM5NzQ3OCAtMS4wMjY1OCwwLjUzOTc0NzggLTAuNjI0NDE1LDAgLTEuMDM3MTYzMywtMC4zMzg2NjU4IC0xLjE2NDE2MjksLTAuOTk0ODI5OCBoIDQuMjQzOTAyOSBjIDAuMDIxMTcsLTAuMTc5OTE2IDAuMDMxNzUsLTAuMzQ5MjQ5IDAuMDMxNzUsLTAuNTI5MTY1IHogbSAtMy4xMTE0OSwtMS40MzkzMjkgYyAwLjU5MjY2NSwwIDEuMDA1NDE0LDAuMzA2OTE2IDEuMTc0NzQ2LDAuODc4NDE0IEggOS41NjUzMTggYyAwLjE1ODc0OTUsLTAuNTcxNDk4IDAuNTYwOTE1LC0wLjg3ODQxNCAxLjEzMjQxMywtMC44Nzg0MTQgeiIKICAgICAgIHN0eWxlPSJmb250LWZhbWlseTpNb250Oy1pbmtzY2FwZS1mb250LXNwZWNpZmljYXRpb246TW9udCIKICAgICAgIGlkPSJwYXRoNTY2MSIgLz4KICAgIDxwYXRoCiAgICAgICBkPSJtIDE3LjcyNTAxNywtMTAuMzIzNTIxIGMgLTAuNDEyNzQ5LDAgLTAuNjY2NzQ4LC0wLjI1NCAtMC42NjY3NDgsLTAuNjU2MTY1IHYgLTEuODIwMzI4IGggMS4zODY0MTIgdiAtMS41MjM5OTUgaCAtMS40Mjg3NDUgdiAtMS42NjE1NzggaCAtMC40MTI3NDkgbCAtMi41NjExNTgsMi43MTk5MDggdiAwLjQ2NTY2NSBoIDEuMDQ3NzQ2IHYgMi4xNDg0MSBjIDAsMS4yNjk5OTYyIDAuNzcyNTgxLDIuMDQyNTc3MSAyLjAzMTk5NCwyLjA0MjU3NzEgaCAxLjM1NDY2MiB2IC0xLjcxNDQ5NDEgeiIKICAgICAgIHN0eWxlPSJmb250LWZhbWlseTpNb250Oy1pbmtzY2FwZS1mb250LXNwZWNpZmljYXRpb246TW9udCIKICAgICAgIGlkPSJwYXRoNTY2MyIgLz4KICA8L2c+Cjwvc3ZnPgo=`

export default logoBase64
