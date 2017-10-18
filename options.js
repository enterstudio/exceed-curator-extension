function save_options() {
  alert('save');
  var subdomain = document.getElementById('subdomain').value;
  chrome.storage.sync.set({
    subdomain: subdomain,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    subdomain: 'public'
  }, function(items) {
    document.getElementById('subdomain').value = items.subdomain;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);