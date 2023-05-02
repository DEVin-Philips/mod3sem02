import { AppModule } from "src/app/app.module";
import { ContentComponent } from "./content.component";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationService } from "src/app/services/notification.service";
import { of } from "rxjs";



describe('ContentComponent', () =>{
    let fixture: ComponentFixture<ContentComponent>;
    let component:ContentComponent;
    let notificationService =  jasmine.createSpyObj(NotificationService, ['editNotificationApi', 'getNotifications']);

    beforeEach(async () => {
        await TestBed.configureTestingModule({
          imports: [AppModule],
          declarations: [ContentComponent],
          providers: [ { provide: NotificationService, useValue: notificationService } ]
        })
        .compileComponents();  // compila o componente (html, ts e css)

      });
     
      beforeEach(() => {         
        //criação do componente ContentComponent para realização dos testes
        fixture = TestBed.createComponent(ContentComponent);
        component = fixture.componentInstance; 
      });

        it('Should create component', () => {
            expect(component).toBeTruthy();
        });
 
    
        it('ngOnInit - Should call carregarNotificacoes method with success', () =>{
            spyOn(component, 'carregarNotificacoes');
            component.ngOnInit();

            expect(component.carregarNotificacoes).toHaveBeenCalled();
        });
        
        it('#lerNotificacao - Should call atualizarLista method with success', () => {
            spyOn(component, 'atualizarLista');
            const notificacaoMock = {aplicativo: '', titulo:'', descricao: '', tempoPublicacao: '',
                                    imagem: '', lido: false, id: 1};
            const notificacaoEditadaMock = { ...notificacaoMock, lido: true };                                    
                                
            notificationService.editNotificationApi.and.returnValue(of({}));            
            
            component.lerNotificacao(notificacaoMock);

            expect(notificationService.editNotificationApi).toHaveBeenCalledWith(notificacaoEditadaMock);
            expect(component.atualizarLista).toHaveBeenCalled();
        });
});
 