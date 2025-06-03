let clientsData = {
            inmobiliario: [
                { nombre: 'María González', email: 'maria@email.com', telefono: '123456789', tipo_propiedad: 'Casa', presupuesto: 2500000, ubicacion: 'Centro', estado: 'activo' },
                { nombre: 'Carlos Rodríguez', email: 'carlos@email.com', telefono: '987654321', tipo_propiedad: 'Departamento', presupuesto: 1800000, ubicacion: 'Norte', estado: 'pendiente' }
            ],
            legal: [
                { nombre: 'Empresa ABC S.A.', email: 'contacto@abc.com', telefono: '555000111', tipo_caso: 'Mercantil', descripcion: 'Constitución de sociedad', honorarios: 50000, estado: 'activo' },
                { nombre: 'Juan Pérez', email: 'juan@email.com', telefono: '555000222', tipo_caso: 'Civil', descripcion: 'Divorcio', honorarios: 25000, estado: 'pendiente' }
            ],
            belleza: [
                { nombre: 'Ana López', email: 'ana@email.com', telefono: '555111333', servicio: 'Color/Tinte', fecha: '2025-06-05', presupuesto: 1500, estado: 'activo' },
                { nombre: 'Sofia Martín', email: 'sofia@email.com', telefono: '555111444', servicio: 'Maquillaje', fecha: '2025-06-10', presupuesto: 800, estado: 'pendiente' }
            ]
        };

        // Funcionalidad de tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const targetTab = this.dataset.tab;
                
                // Remover clase active de todos los botones y contenidos
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
                
                // Agregar clase active al botón clickeado y su contenido
                this.classList.add('active');
                document.getElementById(targetTab).classList.add('active');
                
                updateStats();
            });
        });

        // Manejo de formularios
        document.getElementById('inmobiliario-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const clientData = Object.fromEntries(formData);
            clientData.estado = 'activo';
            clientData.presupuesto = parseInt(clientData.presupuesto) || 0;
            
            clientsData.inmobiliario.push(clientData);
            renderTable('inmobiliario');
            updateStats();
            this.reset();
            
            // Animación de éxito
            showSuccessMessage('Cliente inmobiliario agregado correctamente');
        });

        document.getElementById('legal-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const clientData = Object.fromEntries(formData);
            clientData.estado = 'activo';
            clientData.honorarios = parseInt(clientData.honorarios) || 0;
            
            clientsData.legal.push(clientData);
            renderTable('legal');
            updateStats();
            this.reset();
            
            showSuccessMessage('Cliente legal agregado correctamente');
        });

        document.getElementById('belleza-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const clientData = Object.fromEntries(formData);
            clientData.estado = 'activo';
            clientData.presupuesto = parseInt(clientData.presupuesto) || 0;
            
            clientsData.belleza.push(clientData);
            renderTable('belleza');
            updateStats();
            this.reset();
            
            showSuccessMessage('Cliente de belleza agregado correctamente');
        });

        // Renderizar tablas
        function renderTable(sector) {
            const tbody = document.getElementById(`${sector}-clients`);
            tbody.innerHTML = '';
            
            clientsData[sector].forEach(client => {
                const row = document.createElement('tr');
                
                if (sector === 'inmobiliario') {
                    row.innerHTML = `
                        <td>${client.nombre}</td>
                        <td>${client.tipo_propiedad}</td>
                        <td>$${client.presupuesto.toLocaleString()}</td>
                        <td><span class="status ${client.estado}">${client.estado === 'activo' ? 'Activo' : client.estado === 'pendiente' ? 'Pendiente' : 'Cerrado'}</span></td>
                    `;
                } else if (sector === 'legal') {
                    row.innerHTML = `
                        <td>${client.nombre}</td>
                        <td>${client.tipo_caso}</td>
                        <td>$${client.honorarios.toLocaleString()}</td>
                        <td><span class="status ${client.estado}">${client.estado === 'activo' ? 'Activo' : client.estado === 'pendiente' ? 'Pendiente' : 'Cerrado'}</span></td>
                    `;
                } else if (sector === 'belleza') {
                    row.innerHTML = `
                        <td>${client.nombre}</td>
                        <td>${client.servicio}</td>
                        <td>${client.fecha}</td>
                        <td><span class="status ${client.estado}">${client.estado === 'activo' ? 'Confirmado' : client.estado === 'pendiente' ? 'Pendiente' : 'Completado'}</span></td>
                    `;
                }
                
                tbody.appendChild(row);
            });
        }

        // Actualizar estadísticas
        function updateStats() {
            const totalClients = clientsData.inmobiliario.length + clientsData.legal.length + clientsData.belleza.length;
            const activeDeals = clientsData.inmobiliario.filter(c => c.estado === 'activo').length + 
                              clientsData.legal.filter(c => c.estado === 'activo').length + 
                              clientsData.belleza.filter(c => c.estado === 'activo').length;
            
            const monthlyRevenue = clientsData.inmobiliario.reduce((sum, c) => sum + (c.estado === 'activo' ? c.presupuesto * 0.03 : 0), 0) +
                                  clientsData.legal.reduce((sum, c) => sum + (c.estado === 'activo' ? c.honorarios : 0), 0) +
                                  clientsData.belleza.reduce((sum, c) => sum + (c.estado === 'activo' ? c.presupuesto : 0), 0);
            
            document.getElementById('total-clients').textContent = totalClients;
            document.getElementById('active-deals').textContent = activeDeals;
            document.getElementById('monthly-revenue').textContent = `$${monthlyRevenue.toLocaleString()}`;
        }

        // Mensaje de éxito
        function showSuccessMessage(message) {
            const successDiv = document.createElement('div');
            successDiv.style.cssText = `
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(45deg, #28a745, #20c997);
                color: white;
                padding: 15px 25px;
                border-radius: 12px;
                font-weight: 600;
                z-index: 1000;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
                animation: slideIn 0.3s ease;
            `;
            successDiv.textContent = message;
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
            
            document.body.appendChild(successDiv);
            
            setTimeout(() => {
                successDiv.remove();
                style.remove();
            }, 3000);
        }

        // Inicializar la aplicación
        document.addEventListener('DOMContentLoaded', function() {
            renderTable('inmobiliario');
            renderTable('legal');
            renderTable('belleza');
            updateStats();
        });