# Diagon Arsenal
The Arsenal contains numerous template implants for rapid prototyping purposes. The goal is to provide operators a starting point for unique payload development compliant with Project Prismatica. These implants are focused on code execution with no attention given to post-exploitation activities as such they are referred to as stage 0 implants. Additional stages may be developed in the future to provide a more robust ecosystem.

What follows is a description of the current Implants

- Gryffindor -> Windows Scripting Host JavaScript Remote Access Tool
- Ravenclaw -> PowerShell Remote Access Tool (REWORKING)
- Slytherin -> Basic Python Remote Access Tool
- Stage 0s
  - Python

## Building Payloads

Python Stage 0
```
py2exe stage0.py......
```

## Communicating with Oculus listeners
### HTTP Basic Listener
C2 Beacon
```
{
  "type":"b",
  "agentid": <AGENTID>
}
```

C2 Task Response
```
{
  "type":"r",
  "agentid": 24463333,
  "taskid":"1",
  "cmd":"calc",
  "retval":""
}
```

C2 Return Base64 Encoded Response
```
{
  "type":"r",
  "cmd":"ls",
  "retval":"<BASE64>",
  "agentid":"99463333",
  "taskid":"1"
}
```
