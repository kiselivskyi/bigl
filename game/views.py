from django.shortcuts import render, redirect
from .form import NameForm, SizeForm
from django.contrib.auth.models import User


btns = []
players = {}
diagonal_ban = ''

def reset_size(request):
    ref = str(request.META.get('HTTP_REFERER'))
    http = str(request.META.get('wsgi.url_scheme'))+'://'
    host = str(request.META.get('HTTP_HOST'))
    global btns
    if ref == http+host+'/game/':
        btns = []

def clear_all(request):
    ref = str(request.META.get('HTTP_REFERER'))
    http = str(request.META.get('wsgi.url_scheme'))+'://'
    host = str(request.META.get('HTTP_HOST'))
    global btns, players
    if ref == http+host+'/game/':
        btns = []
        players = {}
		
def index(request):
    global players, btns
    btns = []
    players = {}
    if request.method == 'POST':
        if 'form1.submitted' in request.POST:
            form = NameForm(request.POST)
            if form.is_valid():
                name1 = form.cleaned_data['name1']
                name2 = form.cleaned_data['name2']
                if name1 == name2:
                    message = '<div class="alert alert-danger"> Players%s names must differ!</div>' % "'"
                    return render(request, 'index.html', {'message':message})
                players = {'name1': name1, 'name2': name2}
                return redirect('/settings/', {'players': players})

    return render(request, 'index.html')

def settings(request):
    if players == {}:
        return redirect('/')
    global diagonal_ban
    if request.method == 'POST':
        if 'form2.submitted' in request.POST:
            form2 = SizeForm(request.POST)
            if form2.is_valid():
                size = int(form2.cleaned_data['size'])
                diagonal_ban = form2.cleaned_data['diagonal']
                if not diagonal_ban:
                    diagonal_ban = False
                for i in range(size**2):
                    temp = []
                    temp.append(i+1)
                    if i%size == size-1:
                        temp.append('<br>')
                    else:
                        temp.append('')
                    if size > 5 and size < 8:
                        temp.append('height:70px;width:70px;')
                    elif size > 7 and size < 10:
                        temp.append('height:50px;width:50px;')
                    elif size == 10:
                        temp.append('height:40px;width:40px;')
                    btns.append(temp)					
                return redirect('/game/', {'btns': btns, 'players': players, 'diagonal_ban': diagonal_ban})	

    reset_size(request)
    return render(request, 'settings.html', {'players': players})

def game(request):
    if btns == [] or players == {}:
        return redirect('/settings/')
    return render(request, 'game.html', {'btns': btns, 'size': len(btns), 
	       'players': players, 'diagonal_ban': diagonal_ban})