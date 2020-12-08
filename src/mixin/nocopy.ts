
import { Vue, Component } from "vue-property-decorator"



@Component
export class Nocopy extends Vue {
	mounted() {
        document.oncontextmenu = function (event) {
            event.returnValue = false;
        };
        document.onkeydown = document.onkeyup = document.onkeypress = function (event) {
            let e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 123) {
                e.returnValue = false;
                return false;
            }
		};
		document.onselectstart = function(event){
			event.returnValue = false;
		}
	}

	destroyed(){
		document.oncontextmenu = function (event) {
            event.returnValue = true;
        };
        document.onkeydown = document.onkeyup = document.onkeypress = function (event) {
            let e =
                event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 123) {
                e.returnValue = true;
                return true;
            }
		};
		document.onselectstart = function(event){
			event.returnValue = true;
		}
	}
}
