<template>
  <div class="upload-plugin-container"
       :style="{height: height + 'px' || '300px', width: width + 'px' || '100%'}">
    <Upload multiple
            type="drag"
            :action="'https://talkapi.dei2.com/enkel/user/uploadAvatar?phonenum=' + loginInfo.phonenum + '&token=' + loginInfo.token + '&ms=' + formData.maxSize + '&accept=' + formData.format.join(';') + '&rn=true'"
            :max-size="formData.maxSize"
            :format="formData.format"
            :on-exceeded-size="handleMaxSize"
            :on-format-error="handleFormatError"
            :on-success="uploadSuccess"
            :on-error="uploadFail"
            :style="{height: height + 'px' || '300px', width: width + 'px' || '100%'}">
      <div class="upload-plugin-area"
           :style="{height: height + 'px' || '300px', width: width + 'px' || '100%'}">
        <slot></slot>
        <div class="edit-mask"
             :style="{height: height + 'px' || '300px', width: width + 'px' || '100%'}">
          <Icon type="ios-cloud-upload"
                :size="(width * 0.3 >= 14 && width * 0.3 <= 30) ? width * 0.3 : (width * 0.3 < 14 ? 14 : 30)"></Icon>
        </div>
      </div>
    </Upload>
  </div>
</template>
<style>
.ml10 {
  margin-left: 10px;
}
.upload-plugin-container {
  width: 100%;
  height: 100%;
  border: none;
}
.upload-plugin-area {
  width: 100%;
  height: 300px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  position: relative;
}
.upload-plugin-container .ivu-upload-drag {
  border: none;
  border-radius: 0;
  background-color: transparent;
}
.upload-plugin-container .ivu-upload-drag .edit-mask {
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}
.upload-plugin-container .ivu-upload-drag:hover {
  border: none;
}
.upload-plugin-container .ivu-upload-drag:hover .edit-mask {
  opacity: 1;
}
.edit-mask {
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  text-shadow: none;
  color: #fff;
}
</style>
<script>
// import utils from '../../utils/index'
export default {
  name: 'UploadPlugin',
  props: ['width', 'height'],
  data () {
    return {
      formData: {
        maxSize: 2 * 1024,
        format: ['jpg', 'png', 'jpeg']
      },
      currentPlugin: '',
      currentFileName: ''
    }
  },
  computed: {
    loginInfo () {
      return this.$store.state.loginInfo
    }
  },
  methods: {
    uploadSuccess (event, file, fileList) {
      this.$emit('success', {
        filename: file.name,
        path: event.data.path
      })
    },
    uploadFail (event, file, fileList) {
      this.$Notice.error({
        title: '文件上传失败',
        desc: file.name + '上传失败：' + event.message
      })
      this.$emit('fail', {
        filename: file.name,
        message: event.message
      })
    },
    handleMaxSize (file) {
      this.$Notice.warning({
        title: '文件太大了',
        desc: '文件' + file.name + '太大，请不要超过' + (this.formData.maxSize / 1024) + 'M'
      })
      this.$emit('fail', {
        filename: file.name,
        message: '文件不能超过' + (this.formData.maxSize / 1024) + 'M'
      })
    },
    handleFormatError (file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: file.name + '格式不正确，请上传' + (this.formData.format.join(';')) + '格式的文件'
      })
      this.$emit('fail', {
        filename: file.name,
        message: '请上传' + (this.formData.format.join(';')) + '格式的文件'
      })
    }
  }
}
</script>
