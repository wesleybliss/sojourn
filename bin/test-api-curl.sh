#!/usr/bin/env bash

curl 'http://localhost:4000/api/trips' \
  -v \
  -H 'Accept: */*' \
  -H 'Accept-Language: en-US,en;q=0.9,es;q=0.8' \
  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ijg1NGFhNGMyM2VkZTdiOGNhODc1OWZiMDZlNmExZDU4OTI0MjVkMDYiLCJ0eXAiOiJKV1QifQ.eyJuYW1lIjoiV2VzbGV5IEJsaXNzIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0xxNWtwbkw1V01VdmR4aXo5VG80MVpfYWZmRS1ka1JFX05rMU5kSERYdDQ1amQyQmwyPXM5Ni1jIiwiaXNzIjoiaHR0cHM6Ly9zZWN1cmV0b2tlbi5nb29nbGUuY29tL3RyaXAtcGxhbm5lci03ZmU3YyIsImF1ZCI6InRyaXAtcGxhbm5lci03ZmU3YyIsImF1dGhfdGltZSI6MTc3ODgyMTI4NSwidXNlcl9pZCI6IjFPQUgwRXBocmNnRkp6cFVuSThvdXp5c2p0aTEiLCJzdWIiOiIxT0FIMEVwaHJjZ0ZKenBVbkk4b3V6eXNqdGkxIiwiaWF0IjoxNzgwMzc2Njc3LCJleHAiOjE3ODAzODAyNzcsImVtYWlsIjoid2VzbGV5LmJsaXNzQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7Imdvb2dsZS5jb20iOlsiMTEwNjYwMzQzNTM2MDYwNTc0NDg2Il0sImVtYWlsIjpbIndlc2xleS5ibGlzc0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJnb29nbGUuY29tIn19.LFaIxcYOhJHsCYfhL-MZ_9DR1nXscWR5Mi7Vm-rmymehDBqthevDEm-_iSAngE9FwfXLBiaRcqLmu_aHa58pFGu72u3gRV67o34gA3KKHi6ehK9WfpvcHLuDOEgy5r5YSTGEZvdSCbFJTdGk1avGSnca4bMo8AtaKaaSJtGKxdLHNHVqAkdGvkvDyJFfY4KQEKAd-_6ajUBnTYiCKtFfXd8Dxa2b-fpEWry2Iqrklsvo--HJyHZNbtCNyHgW6nU3H6uY_CMVLm-RccsA20tx7x-xfrCasaWYV0AN0SPjPOee3sJ6yV2Yb-r1RIYfeL7zJZz4JNwboFZgwVm61uKhKg' \
  -H 'Connection: keep-alive' \
  -H 'Content-Type: application/json' \
  -H 'DNT: 1' \
  -H 'If-None-Match: W/"563-Dbi+MtgWsZIwJvzmmWlrVsanbrk"' \
  -H 'Origin: http://localhost:3001' \
  -H 'Referer: http://localhost:3001/' \
  -H 'Sec-Fetch-Dest: empty' \
  -H 'Sec-Fetch-Mode: cors' \
  -H 'Sec-Fetch-Site: same-site' \
  -H 'Sec-GPC: 1' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua: "Chromium";v="148", "Brave";v="148", "Not/A)Brand";v="99"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "Linux"'
