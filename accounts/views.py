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
    """ Webhook لاستقبال بيانات الدفع من فواتيرك """
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            print("✅ Payment Data Received:", data)

            # الحصول على حالة الدفع من بيانات الاستجابة
            payment_status = data.get("status")  # تأكد من أن المفتاح صحيح حسب استجابة فواتيرك
            
            if payment_status == "paid":
                return JsonResponse({"redirect_url": "/form/"})  # إعادة التوجيه إلى الفورم عبر JSON
            
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON"}, status=400)

    return JsonResponse({"status": "received"}, status=200)

def get_location_info(ip_address):
    # رابط الـ API مع التوكن الخاص بك
    url = f"https://ipinfo.io/{ip_address}/json?token=5f01ba4857444e"
    
    # إرسال طلب GET للحصول على البيانات من الـ API
    response = requests.get(url)
    
    if response.status_code == 200:
        # إذا كانت الاستجابة ناجحة (رمز 200)، نقوم بتحويل الاستجابة إلى JSON
        return response.json()
    else:
        # إذا حدث خطأ، نرجع None
        return None

# View لعرض بيانات الموقع بناءً على عنوان IP
def location_view(request):
    ip_address = '197.54.59.165'  # يمكنك تغيير الـ IP أو استخدام الـ IP الخاص بالـ user إذا أردت
    
    # استدعاء الدالة لجلب البيانات
    location_data = get_location_info(ip_address)
    
    if location_data:
        # إذا تم الحصول على البيانات، قم بإرجاعها كـ JSON
        return JsonResponse(location_data)
    else:
        # إذا لم نستطع جلب البيانات، نعرض رسالة خطأ
        return JsonResponse({"error": "لم نتمكن من الحصول على المعلومات"})
