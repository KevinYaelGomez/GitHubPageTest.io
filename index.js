let leads = [];

        // Temporizador de cuenta regresiva
        function updateCountdown() {
            const now = new Date().getTime();
            const endTime = now + (15 * 60 * 60 * 1000) + (24 * 60 * 1000) + (38 * 1000); // 15:24:38
            
            setInterval(() => {
                const currentTime = new Date().getTime();
                const timeLeft = endTime - currentTime;
                
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                
                document.getElementById('countdown').textContent = 
                    `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }, 1000);
        }

        function showInterestForm(service) {
            const modal = document.getElementById('interestModal');
            const title = document.getElementById('modalTitle');
            const specificFields = document.getElementById('specificFields');
            
            // Configurar título y campos específicos según el servicio
            if (service === 'inmobiliario') {
                title.textContent = '🏠 Asesoría Inmobiliaria VIP';
                specificFields.innerHTML = `
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #555;">Tipo de Propiedad de Interés</label>
                        <select name="tipo_propiedad" style="width: 100%; padding: 12px 16px; border: 2px solid #e1e5e9; border-radius: 12px; font-size: 16px;">
                            <option value="casa">Casa</option>
                            <option value="departamento">Departamento</option>
                            <option value="terreno">Terreno</option>
                            <option value="oficina">Oficina</option>
                            <option value="local">Local Comercial</option>
                        </select>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #555;">Presupuesto Aproximado</label>
                        <input type="text" name="presupuesto" placeholder="Ej: $2,000,000" style="width: 100%; padding: 12px 16px; border: 2px solid #e1e5e9; border-radius: 12px; font-size: 16px;">
                    </div>
                `;
            } else if (service === 'legal') {
                title.textContent = '⚖️ Consultoría Legal Express';
                specificFields.innerHTML = `
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #555;">Área Legal de Interés</label>
                        <select name="area_legal" style="width: 100%; padding: 12px 16px; border: 2px solid #e1e5e9; border-radius: 12px; font-size: 16px;">
                            <option value="civil">Derecho Civil</option>
                            <option value="mercantil">Derecho Mercantil</option>
                            <option value="laboral">Derecho Laboral</option>
                            <option value="penal">Derecho Penal</option>
                            <option value="fiscal">Derecho Fiscal</option>
                        </select>
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #555;">Urgencia del Caso</label>
                        <select name="urgencia" style="width: 100%; padding: 12px 16px; border: 2px solid #e1e5e9; border-radius: 12px; font-size: 16px;">
                            <option value="baja">Baja - Tengo tiempo</option>
                            <option value="media">Media - En unas semanas</option>
                            <option value="alta">Alta - Lo necesito YA</option>
                        </select>
                    </div>
                `;
            } else if (service === 'belleza') {
                title.textContent = '✨ Makeover Completo';
                specificFields.innerHTML = `
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #555;">Fecha Preferida</label>
                        <input type="date" name="fecha_preferida" style="width: 100%; padding: 12px 16px; border: 2px solid #e1e5e9; border-radius: 12px; font-size: 16px;">
                    </div>
                    <div style="margin-bottom: 20px;">
                        <label style="display: block; margin-bottom: 8px; font-weight: 600; color: #555;">Ocasión Especial</label>
                        <input type="text" name="ocasion" placeholder="Ej: Boda, evento, sesión de fotos..." style="width: 100%; padding: 12px 16px; border: 2px solid #e1e5e9; border-radius: 12px; font-size: 16px;">
                    </div>
                `;
            }
            
            modal.style.display = 'flex';
            modal.dataset.service = service;
        }

        function closeModal() {
            document.getElementById('interestModal').style.display = 'none';
            document.getElementById('interestForm').reset();
        }

        function showContactInfo() {
            alert(`📞 Contáctanos:\n\n` +
                  `WhatsApp: +52 33 1234-5678\n` +
                  `Email: info@sidebroker.com\n` +
                  `Horario: Lun-Vie 9:00-18:00\n\n` +
                  `¡Te contactaremos en menos de 1 hora!`);
        }

        // Manejo del formulario
        document.getElementById('interestForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const leadData = Object.fromEntries(formData);
            leadData.servicio = document.getElementById('interestModal').dataset.service;
            leadData.fecha_registro = new Date().toISOString();
            
            leads.push(leadData);
            
            // Simular envío exitoso
            closeModal();
            
            // Mostrar mensaje de éxito
            const successDiv = document.createElement('div');
            successDiv.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, #28a745, #20c997);
                color: white;
                padding: 30px 40px;
                border-radius: 20px;
                font-weight: 600;
                z-index: 2000;
                box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
                text-align: center;
                max-width: 400px;
                animation: successPop 0.5s ease;
            `;
            
            successDiv.innerHTML = `
                <div style="font-size: 48px; margin-bottom: 15px;">🎉</div>
                <div style="font-size: 18px; margin-bottom: 10px;">¡Solicitud Enviada!</div>
                <div style="font-size: 14px; opacity: 0.9;">Te contactaremos en menos de 1 hora para confirmar tu promoción especial.</div>
            `;
            
            document.body.appendChild(successDiv);
            
            // Agregar estilo de animación
            const style = document.createElement('style');
            style.textContent = `
                @keyframes successPop {
                    0% { transform: translate(-50%, -50%) scale(0.5); opacity: 0; }
                    100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                successDiv.remove();
                style.remove();
            }, 4000);
            
            console.log('Nuevo lead registrado:', leadData);
        });

        // Cerrar modal al hacer clic fuera
        document.getElementById('interestModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Inicializar countdown
        updateCountdown();