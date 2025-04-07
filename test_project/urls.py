from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from accounts import views


urlpatterns = [
    path('', views.index, name='index'),
    path('about.html', views.about, name='about'),
    path('test2.html', views.test2, name='test2'),
    path('calc/', views.calc, name='calc'),
    path('package1.html', views.package1, name='package1'),
    path('webhook/paid/', views.paid_webhook, name='paid_webhook'),
    path('location/', views.location_view, name='location'),  # إضافة مسار للوصول إلى location_view

    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
