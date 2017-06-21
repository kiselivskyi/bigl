from django import forms

class NameForm(forms.Form):
    name1 = forms.CharField(max_length=100)
    name2 = forms.CharField(max_length=100)
	
class SizeForm(forms.Form):
    size = forms.CharField(max_length=100)
    diagonal = forms.BooleanField(required=False)    