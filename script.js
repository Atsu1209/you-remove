 document.getElementById('fileInput').addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const uploadImage = document.getElementById('uploadImage');
                    uploadImage.src = e.target.result;
                    uploadImage.style.display = 'block';
                    uploadImage.style.left = '410px'; // 初期位置
                    uploadImage.style.top = '291px'; // 初期位置
                    uploadImage.style.width = '180px'; // 初期幅
                    uploadImage.style.height = '180px'; // 初期高さ
                };
                reader.readAsDataURL(file);
            }
        });

        const uploadImage = document.getElementById('uploadImage');
        let isDragging = false;
        let offsetX, offsetY;

        uploadImage.addEventListener('mousedown', function(e) {
            isDragging = true;
            offsetX = e.clientX - parseInt(uploadImage.style.left, 10);
            offsetY = e.clientY - parseInt(uploadImage.style.top, 10);
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                uploadImage.style.left = (e.clientX - offsetX) + 'px';
                uploadImage.style.top = (e.clientY - offsetY) + 'px';
                updatePositionInputs();
            }
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
        });

        function updatePositionInputs() {
            document.getElementById('xPos').value = parseInt(uploadImage.style.left, 10);
            document.getElementById('yPos').value = parseInt(uploadImage.style.top, 10);
        }

        document.getElementById('xPos').addEventListener('input', function() {
            uploadImage.style.left = this.value + 'px';
        });

        document.getElementById('yPos').addEventListener('input', function() {
            uploadImage.style.top = this.value + 'px';
        });

        document.getElementById('width').addEventListener('input', function() {
            uploadImage.style.width = this.value + 'px';
        });

        document.getElementById('height').addEventListener('input', function() {
            uploadImage.style.height = this.value + 'px';
        });

        function getCanvasWithImage() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const container = document.getElementById('container');

            // コンテナのサイズにキャンバスを合わせる
            canvas.width = container.clientWidth;
            canvas.height = container.clientHeight;

            // 背景画像を描画
            ctx.drawImage(document.getElementById('backgroundImage'), 0, 0);

            // アップロード画像を描画
            const bgImg = document.getElementById('backgroundImage');
            const uploadImg = document.getElementById('uploadImage');
            ctx.drawImage(
                uploadImg,
                parseInt(uploadImg.style.left, 10),
                parseInt(uploadImg.style.top, 10),
                parseInt(uploadImg.style.width, 10),
                parseInt(uploadImg.style.height, 10)
            );

            return canvas;
        }

        document.getElementById('saveScreenshot').addEventListener('click', function() {
            const canvas = getCanvasWithImage();
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/png'); // PNG形式で保存
            link.download = 'YouRemove.png'; // ファイル名を設定
            link.click();
        });

        document.getElementById('previewScreenshot').addEventListener('click', function() {
            const canvas = getCanvasWithImage();
            const previewImage = document.getElementById('previewImage');
            previewImage.src = canvas.toDataURL('image/png'); // PNG形式でプレビュー
            document.getElementById('previewContainer').style.display = 'block';
        });

        document.getElementById('closePreview').addEventListener('click', function() {
            document.getElementById('previewContainer').style.display = 'none';
        });
