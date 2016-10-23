<template>
	<div class="container">
	  <div class="row">
          <div class="col-xs-offset-2 col-xs-8">
              <div class="home-intro">
      	        <div class="vscp">
      	            <span id="vscp">
      	                <span>V</span>
                          <span>S</span>
                          <span>C</span>
                          <span>P</span>
      	            </span>
      	        </div>
                  <div class="brief-intro">
                      <p>
                          Video surveillance cloud platform
                      </p>
                      <p>
                          using docker
                      </p>
                  </div>
      	    </div>
          </div>

          <div class="col-xs-12">
              <div class="vscp-feature">
                  <div class="block storage">
                      <h3 class="block-title">Storage</h3>
                      <p class="block-text">
                          Mass video storage based on HDFS
                      </p>
                  </div>
                  <div class="block compute">
                      <h3 class="block-title">Compute</h3>
                      <p class="block-text">
                          Parallel execution of large scale video processing tasks based on docker and k8s
                      </p>
                  </div>


              </div>
          </div>

	  </div>
	</div>
</template>
<script>




export default {
    components:{  }
}
</script>
<style lang="sass" scoped>
.home-intro{
    .vscp,
    .brief-intro{
        text-align: center;
    }
    .brief-intro{
        animation: showIntro 1s ease-in-out;
    }
    #vscp{
        span{
            font-size: 16em;
            &:nth-child(1){
                animation: jump .3s ease-in-out;
            }
            &:nth-child(2){
                animation: jump .3s ease-in-out .06s;
            }
            &:nth-child(3){
                animation: jump .3s ease-in-out .12s;
            }
            &:nth-child(4){
                animation: jump .3s ease-in-out .2s;
            }
        }
    }

}
.vscp-feature{
    .block{
        background-color: #fff;
        box-shadow: 0 38px 43px rgba(0,0,0,.09);
        width: 400px;
        height: 500px;
        float: left;
        padding: 55px;
        animation: jump .4s ease-in;

        .block-title{
            font-size: 60px;

            text-align: center;

            line-height: 60px;
            margin-top: 70px;
            margin-bottom: 87px;
        }
        .block-text{
            font-weight: 500;
            color: #322525;

        }
        &:nth-child(1){
            .block-title{
                color: #ea9078;
            }
        }
        &:nth-child(2){
                margin-left: 160px;
        }
    }
    &:before,
    &:after{
        content:"";
        display: table;
    }
    &:after{
        clear: both;
    }
}
@keyframes jump{
    0%{
        transform: translate(0, 345px);
        opacity: 0;
    }
    50%{
        transform: translate(0, 200px);
        opacity: 0.8;
    }
    75%{
        transform: translate(0, 100px);
        opacity: 1;
    }
    100%{
        transform: translate(0, 0);
        opacity: 1;
    }
}

@keyframes showIntro{
    0%{
        opacity: 0;
    }
    100%{
        opacity: 1;
    }
}
</style>
