from django.shortcuts import render
from django.http import JsonResponse
import json
import requests

def index(request):
    return render(request, 'accounts/index.html')

def about(request):
    return render(request, 'accounts/about.html')

def calc(request):
    return render(request, 'accounts/calc.html')

def test2(request):
    return render(request, 'accounts/test2.html')

def package1(request):
    return render(request, 'accounts/package1.html')

def paid_webhook(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            print("✅ Payment Data Received:", data)

            payment_status = data.get("status")
            if payment_status == "paid":
                return JsonResponse({"redirect_url": "/form/"})
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    return JsonResponse({"status": "received"}, status=200)

# دالة للحصول على IP المستخدم الحقيقي
def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

# دالة تجيب بيانات الموقع الجغرافي
def location_view(request):
    ip_address = get_client_ip(request)
    url = f"https://ipinfo.io/{ip_address}/json?token=5f01ba4857444e"
    
    try:
        response = requests.get(url)
        if response.status_code == 200:
            data = response.json()
            return JsonResponse(data)
    except:
        pass

    return JsonResponse({"error": "لم نتمكن من الحصول على المعلومات"}, status=400)
