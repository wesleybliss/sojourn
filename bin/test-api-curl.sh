#!/usr/bin/env bash

curl 'http://localhost:4000/api/trips' \
  -H 'sec-ch-ua-platform: "Linux"' \
  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg1NGFhNGMyM2VkZTdiOGNhODc1OWZiMDZlNmExZDU4OTI0MjVkMDYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiV2VzbGV5IEJsaXNzIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xxNWtwbkw1V01VdmR4aXo5VG80MVpfYWZmRS1ka1JFX05rMU5kSERYdDQ1amQyQmwyPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3RyaXAtcGxhbm5lci03ZmU3YyIsImF1ZCI6InRyaXAtcGxhbm5lci03ZmU3YyIsImF1dGhfdGltZSI6MTc3ODgyMTI4NSwidXNlcl9pZCI6IjFPQUgwRXBocmNnRkp6cFVuSThvdXp5c2p0aTEiLCJzdWIiOiIxT0FIMEVwaHJjZ0ZKenBVbkk4b3V6eXNqdGkxIiwiaWF0IjoxNzgwMzcyNTczLCJleHAiOjE3ODAzNzYxNzMsImVtYWlsIjoid2VzbGV5LmJsaXNzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTEwNjYwMzQzNTM2MDYwNTc0NDg2Il0sImVtYWlsIjpbIndlc2xleS5ibGlzc0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.LO5vr7zW0EWD1t7l5vXq9-kSAbo2X-daHTbPthDQxS3wt8h_5-cGPvG90WZA31vP-mQgu3gugtGlNGDPC_cXNSvNSi3KPsCJ9qcGTiKbSY27FacA7iC57IQ7lrAvKESkHHZsRZ6DXOakWoHQnPHWwDTZVpW3gXVP-lAJMH8ZQhei5KktgaXgpVQ3Tde4SaXClBvazlNnz_V80T3y0zUN5KGDv1GnmHboIs_RuhphOJraYbPUrRbdatiEFqAC7yK8L78-VxAck06MzJt-gtdZSyY_apqIT-OlKfbW-jzbpvAdgF7I-Ou1aUK-5wYeP8GbZv2wNU7TmQSMVh3Z3RiSnw' \
  -H 'Referer: http://localhost:3001/' \
  -H 'sec-ch-ua: "Chromium";v="148", "Brave";v="148", "Not/A)Brand";v="99"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36' \
  -H 'DNT: 1' \
  -H 'Content-Type: application/json'
