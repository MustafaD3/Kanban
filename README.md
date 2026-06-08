# 📋 Minimalist Kanban Board

Docker ve Docker Compose ile anında ayağa kalkan, işlerinizi organize etmenizi ve verilerinizi dışa aktarmanızı sağlayan hafif ve işlevsel bir Kanban panosu uygulamasıdır.

## 🚀 Öne Çıkan Özellikler

* **Hızlı Görev Ekleme:** Yapılacaklar (Todo) listesine saniyeler içinde yeni görevler tanımlayın.
* **Sürükle-Bırak (Drag & Drop):** Görevleri sütunlar arasında sürükleyerek durumlarını kolayca güncelleyin.
* **JSON Çıktısı Alma:** Panonuzdaki tüm verileri tek tıkla **JSON formatında dışa aktarın** ve yedekleyin.
* **Sıfır Kurulum Maliyeti:** Docker sayesinde bilgisayarınıza hiçbir bağımlılık yüklemeden çalıştırın.

## 🛠️ Gereksinimler

Projenin çalışması için sisteminizde sadece Docker'ın kurulu olması yeterlidir:
* [Docker Desktop](https://docker.com) veya Docker Engine (Compose destekli)

## ⚙️ Kurulum ve Çalıştırma

Proje dizininde `compose.yaml` dosyanız hazır olduğu için uygulamayı tek bir komutla derleyip ayağa kaldırabilirsiniz.

**1. Projeyi derleyin ve arka planda çalıştırın:**
```bash
docker compose up --build -d
```

**2. Konteyner durumunu kontrol edin (Opsiyonel):**
Uygulamanın sorunsuz çalıştığından emin olmak için:
```bash
docker compose ps
```

**3. Uygulamayı durdurmak isterseniz:**
```bash
docker compose down
```

## 🌐 Uygulamaya Erişim

Kurulum tamamlandıktan sonra tarayıcınızı açın ve şu adrese gidin:
👉 **[http://localhost:8080](http://localhost:8080)**

