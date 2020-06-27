const forms = () => {
    const form = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          phoneInputs = document.querySelectorAll('input[name="user_phone"]');
    
    // проверяем ввод 
    phoneInputs.forEach( item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });
    
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро с Вами свяжемя',
        failure: 'Что-то пошло не так...'
    };

    const clearInputs = () => {
        inputs.forEach( item => {
            item.value = '';
        });
    };

    const postData = async (url, data) => {
        document.querySelector('.status'.textContent = message.loading);
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    form.forEach( item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            item.appendChild(statusMessage);

            const formData = new FormData(item);

            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessage.textContent = message.success;
                })
                .catch(() => statusMessage.textContent = message.failure).finally( () => {
                    clearInputs();
                    setTimeout( () => {
                        statusMessage.remove();
                    }, 50000);
                });

        });
    });

};

export default forms;