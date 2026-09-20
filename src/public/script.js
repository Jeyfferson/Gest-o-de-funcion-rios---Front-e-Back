const API_URL = 'http://localhost:3000/funcionarios';

// Função para buscar e renderizar os funcionários na tabela
async function loadingEmployees() {
  try {
    const response = await fetch(API_URL);
    const employees = await response.json();

    const table = document.getElementById('employeeTable');
    table.innerHTML = '';

    employees.forEach(employee => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${employee.id}</td>
        <td>${employee.nome}</td>
        <td>${employee.cargo}</td>
        <td>R$ ${parseFloat(employee.salario).toFixed(2)}</td>
        <td class="text-center">
          <button class="btn-icon edit" onclick="editEmployee(${employee.id}, '${employee.nome}', '${employee.cargo}', ${employee.salario})">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn-icon delete" onclick="deleteEmployee(${employee.id})">
            <i class="fa-solid fa-trash"></i>
          </button>
        </td>
      `;
      table.appendChild(tr);
    });
  } catch (error) {
    console.error('Erro ao carregar funcionários:', error);
  }
}

// Preenche o formulário com os dados do funcionário para edição
function editEmployee(id, nome, cargo, salario) {
  document.getElementById('employee-id').value = id;
  document.getElementById('nome').value = nome;
  document.getElementById('cargo').value = cargo;
  document.getElementById('salario').value = salario;

  // Exibe o botão Cancelar
  const btnCancel = document.getElementById('btn-cancel');
  if (btnCancel) btnCancel.classList.remove('d-none');
}

// Exclui um funcionário no backend
async function deleteEmployee(id) {
  if (confirm('Tem certeza que deseja excluir este funcionário?')) {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      await loadingEmployees();
    } catch (error) {
      console.error('Erro ao excluir funcionário:', error);
    }
  }
}

// Reseta o formulário e oculta o botão cancelar
function clearForm() {
  document.getElementById('employee-form').reset();
  document.getElementById('employee-id').value = '';
  
  const btnCancel = document.getElementById('btn-cancel');
  if (btnCancel) btnCancel.classList.add('d-none');
}

// Evento do botão Cancelar (se existir no HTML)
const btnCancel = document.getElementById('btn-cancel');
if (btnCancel) {
  btnCancel.addEventListener('click', clearForm);
}

// Evento ao enviar o formulário (Cadastrar ou Atualizar)
document.getElementById('employee-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  const id = document.getElementById('employee-id').value;
  const nome = document.getElementById('nome').value;
  const cargo = document.getElementById('cargo').value;
  const salario = document.getElementById('salario').value;

  const employeeData = { nome, cargo, salario };

  try {
    if (id) {
      await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData)
      });
    } else {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employeeData)
      });
    }

    clearForm();
    await loadingEmployees();
  } catch (error) {
    console.error('Erro ao salvar funcionário:', error);
  }
});

// Carrega os dados na abertura inicial da página
document.addEventListener('DOMContentLoaded', loadingEmployees);