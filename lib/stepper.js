function stepper(){
    return (function()
    {
        var step = 1;
        var callbacks = {};
        var maxSteps = 5;
        var itemMenuHighlightClass = "active";

        return {
            setCallbacks:function(){
                callbacks = { global: { } };
                for(var i=1; i<=maxSteps; i++){
                    callbacks["step" + i.toString()] = {}
                }
            },

            addCallback:function(step, _function, when){
                callbacks["step" + step.toString()][when] = _function;
            },

            addGlobalCallback:function(_function, when){
                callbacks["global"][when] = _function;
            },

            triggerGlobalCallback:function(_step, prevOrNextStep, cType){
                if( (cType == "after" || cType == "before") && eval("callbacks.global") && typeof(eval("callbacks.global." + cType)) == "function"){
                    return eval("callbacks.global." + cType + "(" + _step.toString() + "," + prevOrNextStep.toString() + ")");
                } else {
                    return true;
                }
            },

            triggerCallback:function(_step, cType){
                if(cType == "after" || cType == "before"){
                    if( eval("callbacks.step" + _step.toString()) && typeof(eval("callbacks.step" + _step.toString() + "." + cType)) == "function" ){
                        return eval("callbacks.step" + _step.toString() + "." + cType + "()");
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            },

            init:function(options){
                options = options || {};
                options = $.extend({ maxSteps: 5, startStep: 1, itemActiveClass: "active" }, options);
                maxSteps = options["maxSteps"];
                startStep = options["startStep"] || 1;
                itemMenuHighlightClass = options["itemActiveClass"];
                this.setCallbacks();
                this.setupOnclickEvents();
                this.showStep(startStep, true);
            },

            setupOnclickEvents:function(){
                var that = this;
                $("button.switch-step,a.switch-step").click(function(){
                    if($.inArray($(this).data("step"), ["prev", "next"]) >= 0){
                        that[$(this).data("step")]();
                    } else {
                        that.showStep($(this).data("step"));
                    }
                })
            },

            getStep:function(){
                return step;
            },

            showStep:function(_step, forceStep){
                forceStep = forceStep == undefined ? false : forceStep;
                if((step != _step && _step <= maxSteps) || forceStep){
                    if(this.triggerCallback(step, "after")){
                        this.triggerGlobalCallback(step, _step, "after");
                        $(".stepper-step").hide();
                        this.triggerCallback(_step, "before");
                        this.triggerGlobalCallback(_step, step, "before");
                        $(".stepper-step.step-" + _step.toString()).show();
                        step = _step;
                        this.handleMenuHighlighting();
                    }
                }
            },

            next:function(){
                if(this.getStep()+1 <= maxSteps){
                    this.showStep(this.getStep()+1);
                }
            },

            prev:function(){
                if(this.getStep()-1 > 0){
                    this.showStep(this.getStep()-1);
                }
            },

            handleMenuHighlighting:function(){
                if($("a.stepper-menu,button.stepper-menu").length > 0){
                    $("a.stepper-menu,button.stepper-menu").removeClass(itemMenuHighlightClass).removeClass("disabled");
                    $("a.stepper-menu[data-step=" + step +"],button.stepper-menu[data-step=" + step +"]").addClass(itemMenuHighlightClass);
                    $("button.stepper-menu").prop("disabled", "");
                    if(step == 1){
                        $("a.stepper-menu[data-step=prev],button.stepper-menu[data-step=prev]").addClass("disabled");
                        $("button.stepper-menu[data-step=prev]").prop("disabled", "disabled");
                    } else if(step == maxSteps){
                        $("a.stepper-menu[data-step=next],button.stepper-menu[data-step=next]").addClass("disabled");
                        $("button.stepper-menu[data-step=next]").prop("disabled", "disabled");
                    }
                }
            }
        }
    }());
}